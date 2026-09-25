(() => {
  'use strict';

  class StreamLivePlayer {
    constructor(channelId) {
      this.channelId = channelId;
      this.videoElement = document.getElementById('main-live-video');
      this.placeholder = document.getElementById('live-player-placeholder');
      this.titleElement = document.getElementById('current-program-title');
      this.timeElement = document.getElementById('current-program-time');
      this.descriptionElement = document.getElementById('current-program-description');
      this.progressBar = document.getElementById('program-progress-bar');
      this.badge = document.getElementById('live-badge');
      this.hls = null;
      this.occurrences = [];
      this.activeOccurrenceId = null;
      this.pollTimer = null;
      this.progressTimer = null;
    }

    async initLive() {
      if (!this.videoElement) return;
      await this.refresh();
      this.pollTimer = window.setInterval(() => this.refresh(), 30_000);
      this.progressTimer = window.setInterval(() => this.updateProgress(), 1_000);
    }

    async refresh() {
      try {
        const response = await fetch(
          '/api/channels/' + encodeURIComponent(this.channelId) + '/programs',
          { headers: { Accept: 'application/json' } }
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data?.error || 'EPG indisponible');
        }

        this.occurrences = Array.isArray(data.occurrences) ? data.occurrences : [];
        const current = this.findCurrentProgram(this.occurrences, new Date());

        if (!current) {
          this.activeOccurrenceId = null;
          this.showUnavailable('Aucun programme prévu à cette heure.');
          return;
        }

        this.renderCurrent(current);

        if (String(this.activeOccurrenceId) !== String(current.occurrenceId)) {
          this.activeOccurrenceId = current.occurrenceId;
          await this.resolveAndPlay(current);
        } else {
          this.updateProgress();
        }
      } catch (error) {
        console.error('[StreamLivePlayer]', error);
        this.showUnavailable('Impossible de charger le programme en cours.');
      }
    }

    findCurrentProgram(occurrences, currentTime) {
      const now = currentTime.getTime();
      return occurrences.find(program => {
        const start = Date.parse(program.startAt);
        const end = Date.parse(program.endAt || '');
        return Number.isFinite(start) &&
          start <= now &&
          (Number.isNaN(end) || now < end);
      }) || null;
    }

    renderCurrent(program) {
      const start = Date.parse(program.startAt);
      const end = Date.parse(program.endAt || '');

      this.titleElement.textContent = program.title || 'Programme en cours';
      this.timeElement.textContent =
        this.formatTime(start) + ' — ' + (Number.isFinite(end) ? this.formatTime(end) : '--:--');
      this.descriptionElement.textContent = program.description || '';

      if (this.badge) this.badge.textContent = 'EN DIRECT';
      this.updateProgress();
    }

    updateProgress() {
      const current = this.occurrences.find(
        item => String(item.occurrenceId) === String(this.activeOccurrenceId)
      );
      if (!current || !this.progressBar) return;

      const start = Date.parse(current.startAt);
      const end = Date.parse(current.endAt || '');
      const now = Date.now();

      if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
        this.progressBar.style.width = '0%';
        return;
      }

      const progress = Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
      this.progressBar.style.width = progress.toFixed(2) + '%';
    }

    async resolveAndPlay(program) {
      const query = new URLSearchParams({
        channelId: this.channelId,
        occurrenceId: String(program.occurrenceId)
      });

      try {
        const response = await fetch(
          '/api/programs/resolve-playback?' + query.toString(),
          { headers: { Accept: 'application/json' } }
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data?.error || 'Lecture indisponible');
        }

        if (data.mode === 'LIVE' || data.mode === 'VOD') {
          this.loadMedia(data.playbackUrl, data.mode === 'LIVE');
          return;
        }

        this.showUnavailable(
          data.message || 'Aucune source vidéo réelle et autorisée pour ce programme.'
        );
      } catch (error) {
        console.error('[StreamLivePlayer playback]', error);
        this.showUnavailable('Source vidéo non disponible pour ce programme.');
      }
    }

    loadMedia(url, live) {
      if (!url || !this.videoElement) return;

      this.destroyHls();
      this.placeholder.classList.add('hidden');
      this.videoElement.hidden = false;
      this.videoElement.removeAttribute('src');

      if (window.Hls && Hls.isSupported() && /\.m3u8(?:$|\?)/i.test(url)) {
        this.hls = new Hls({
          enableWorker: true,
          lowLatencyMode: Boolean(live),
          capLevelToPlayerSize: true,
          maxBufferLength: 10
        });

        this.hls.loadSource(url);
        this.hls.attachMedia(this.videoElement);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.videoElement.play().catch(() => {});
        });
        return;
      }

      this.videoElement.src = url;
      this.videoElement.play().catch(() => {});
    }

    showUnavailable(message) {
      this.destroyHls();
      if (this.videoElement) {
        this.videoElement.pause();
        this.videoElement.removeAttribute('src');
        this.videoElement.load();
        this.videoElement.hidden = true;
      }
      if (this.placeholder) {
        this.placeholder.textContent = message;
        this.placeholder.classList.remove('hidden');
      }
    }

    destroyHls() {
      if (this.hls) {
        this.hls.destroy();
        this.hls = null;
      }
    }

    formatTime(timestamp) {
      if (!Number.isFinite(timestamp)) return '--:--';
      return new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Africa/Abidjan',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date(timestamp));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').filter(Boolean);
    const params = new URLSearchParams(window.location.search);
    const channelId = path[0] === 'channel' ? path[1] : params.get('id');

    if (channelId) {
      const player = new StreamLivePlayer(channelId);
      player.initLive();
      window.streamLivePlayer = player;
    }
  });
})();
