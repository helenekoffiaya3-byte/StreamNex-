/**
 * StreamLive — contrôleur du lecteur vidéo
 *
 * Chaîne de lecture :
 * occurrence EPG -> résolution serveur -> LIVE/VOD/NONE -> HTML5/HLS.js
 *
 * Le navigateur ne choisit jamais l'URL de lecture.
 */
class StreamLivePlayer {
  constructor(ids = {}) {
    this.video = document.getElementById(ids.videoId || "streamVideo");
    this.modal = document.getElementById(ids.modalId || "modal");
    this.title = document.getElementById(ids.titleId || "playerTitle");
    this.status = document.getElementById(ids.statusId || "playerStatus");
    this.note = document.getElementById(ids.noteId || "playerNote");
    this.empty = document.getElementById(ids.emptyId || "playerEmpty");

    this.hls = null;
    this.activeChannelId = null;
    this.activeOccurrenceId = null;
    this.activeMode = null;
    this.requestId = 0;

    if (!this.video) {
      throw new Error("Lecteur vidéo StreamLive introuvable.");
    }

    this.video.addEventListener("ended", () => {
      if (window.shuffleMode) window.scheduleRandomFallback?.();
    });

    this.video.addEventListener("error", () => {
      if (window.shuffleMode) window.scheduleRandomFallback?.();
    });
  }

  setLoading(message) {
    this.stopPlayback();

    this.modal?.classList.add("open");

    if (this.empty) this.empty.style.display = "block";
    this.video.style.display = "none";

    if (this.status) this.status.textContent = message;
    if (this.note) this.note.textContent = "StreamLive — résolution serveur";
  }

  async selectProgram(
    channelId,
    occurrenceId,
    title = "Aucun programme sélectionné",
    metaDetails = "",
    posterUrl = null
  ) {
    const requestId = ++this.requestId;

    this.activeChannelId = channelId ?? null;
    this.activeOccurrenceId = occurrenceId ?? null;
    this.activeMode = null;

    if (this.title) this.title.textContent = title;

    this.modal?.classList.add("open");

    if (posterUrl) {
      this.video.poster = posterUrl;
    } else {
      this.video.removeAttribute("poster");
    }

    this.setLoading(
      occurrenceId
        ? "Résolution du flux par le serveur…"
        : "Sélectionnez un créneau EPG disponible."
    );

    if (this.status && metaDetails) {
      this.status.textContent = metaDetails;
    }

    if (!occurrenceId) {
      this.showError("Aucun programme EPG disponible pour la lecture.");
      return;
    }

    if (channelId == null || String(channelId).trim() === "") {
      this.showError("Chaîne EPG invalide.");
      return;
    }

    return this.resolveAndPlay(channelId, occurrenceId, metaDetails, requestId);
  }

  async resolveAndPlay(channelId, occurrenceId, metaDetails = "", requestId = this.requestId) {
    try {
      const q = new URLSearchParams({
        channelId: String(channelId),
        occurrenceId: String(occurrenceId)
      });

      const response = await fetch(
        "/api/programs/resolve-playback?" + q.toString(),
        {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "same-origin"
        }
      );

      const data = await response.json().catch(() => ({}));

      if (requestId !== this.requestId) return;

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Résolution du programme impossible.");
      }

      if (data.programTitle && this.title) {
        this.title.textContent = data.programTitle;
      }

      const mode = data.mode;
      const playbackUrl = data.playbackUrl;

      if (
        mode !== "LIVE" &&
        mode !== "VOD"
      ) {
        this.activeMode = "NONE";
        this.showError(
          data.message ||
          "Aucune source vidéo réelle et autorisée n’est disponible."
        );
        return;
      }

      if (!playbackUrl) {
        this.activeMode = "NONE";
        this.showError(
          "Aucune source vidéo réelle et autorisée n’est disponible."
        );
        return;
      }

      if (!/^https?:\/\//i.test(String(playbackUrl))) {
        this.activeMode = "NONE";
        this.showError("Source vidéo invalide.");
        return;
      }

      this.activeMode = mode;

      if (this.note) {
        this.note.textContent =
          mode === "LIVE"
            ? "LIVE — flux résolu par le serveur"
            : "VOD — source résolue par le serveur";
      }

      if (this.status && metaDetails) {
        this.status.textContent = metaDetails;
      }

      await this.loadSource(playbackUrl, mode, requestId);
    } catch (error) {
      if (requestId !== this.requestId) return;

      console.error("[StreamLive Player] Résolution impossible :", error);
      this.showError(error.message || "Lecture indisponible.");
    }
  }

  loadSource(url, mode, requestId = this.requestId) {
    this.stopPlayback();

    if (requestId !== this.requestId) {
      return Promise.resolve();
    }

    const source = String(url);
    const isHls = /\.m3u8(?:$|[?#])/i.test(source);

    if (isHls && window.Hls && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: mode === "LIVE",
        backBufferLength: mode === "LIVE" ? 30 : 90
      });

      this.hls = hls;
      window.streamLiveHls = hls;

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data?.fatal || requestId !== this.requestId) return;

        console.error("[StreamLive Player] Erreur HLS fatale :", data);

        hls.destroy();
        if (this.hls === hls) this.hls = null;
        if (window.streamLiveHls === hls) window.streamLiveHls = null;

        this.showError("Le flux vidéo est devenu indisponible.");
      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (requestId !== this.requestId) return;

        this.showVideo();

        this.video.play().catch(() => {
          if (this.status) {
            this.status.textContent =
              "Appuyez sur ▶ pour démarrer la lecture.";
          }
        });
      });

      hls.loadSource(source);
      hls.attachMedia(this.video);

      return Promise.resolve();
    }

    if (
      isHls &&
      this.video.canPlayType("application/vnd.apple.mpegurl")
    ) {
      this.video.src = source;

      this.video.onloadedmetadata = () => {
        if (requestId !== this.requestId) return;

        this.showVideo();

        this.video.play().catch(() => {
          if (this.status) {
            this.status.textContent =
              "Appuyez sur ▶ pour démarrer la lecture.";
          }
        });
      };

      this.video.onerror = () => {
        if (requestId === this.requestId) {
          this.showError("Le flux vidéo est indisponible ou inaccessible.");
        }
      };

      return Promise.resolve();
    }

    if (!isHls) {
      this.video.src = source;

      this.video.onloadedmetadata = () => {
        if (requestId === this.requestId) {
          this.showVideo();
        }
      };

      this.video.onerror = () => {
        if (requestId === this.requestId) {
          this.showError("La vidéo est indisponible ou inaccessible.");
        }
      };

      return Promise.resolve();
    }

    return Promise.reject(
      new Error("Ce navigateur ne prend pas en charge HLS.")
    );
  }

  showVideo() {
    if (this.empty) this.empty.style.display = "none";
    this.video.style.display = "block";
  }

  showError(message) {
    if (this.empty) this.empty.style.display = "block";
    this.video.style.display = "none";

    if (this.status) this.status.textContent = message;
    if (this.note) this.note.textContent = "Lecture indisponible";
  }

  stopPlayback() {
    this.video.pause();

    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }

    if (window.streamLiveHls) {
      window.streamLiveHls = null;
    }

    this.video.removeAttribute("src");
    this.video.load();

    this.video.style.display = "none";

    this.video.onloadedmetadata = null;
    this.video.onerror = null;
  }

  close() {
    ++this.requestId;

    this.activeChannelId = null;
    this.activeOccurrenceId = null;
    this.activeMode = null;

    this.stopPlayback();
    this.modal?.classList.remove("open");
  }
}

window.StreamLivePlayer = StreamLivePlayer;
