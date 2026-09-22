(() => {
  const path = window.location.pathname.split('/').filter(Boolean);
  const params = new URLSearchParams(window.location.search);
  const channelId = path[0] === 'channel' ? path[1] : params.get('id');

  const $ = id => document.getElementById(id);
  let hls = null;
  let channel = null;
  let occurrences = [];

  if (!channelId) {
    window.location.href = '/';
    return;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    setupFavorite();

    try {
      await loadChannel();
      await loadSchedule();
      await loadCatalog();
    } catch (error) {
      console.error('[Channel]', error);
      $('currentProgramTitle').textContent = 'Données indisponibles';
      $('currentProgramDesc').textContent = 'Les données réelles de cette chaîne ne sont pas disponibles.';
    }
  });

  async function api(url) {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await response.json();
    if (!response.ok || data.success === false) {
      throw new Error(data.message || data.error || 'Erreur API');
    }
    return data;
  }

  async function loadChannel() {
    const data = await api('/api/channels/' + encodeURIComponent(channelId));
    channel = data.channel;

    document.title = 'StreamLive — ' + channel.name;
    $('channelName').textContent = channel.name;
    $('channelMeta').textContent = 'Groupe : ' + channel.group + ' • Canal ' + String(channel.number).padStart(2, '0');
    $('channelLogo').src = channel.logoUrl;
    $('channelLogo').alt = channel.name;

    if (channel.streamUrl) {
      play(channel.streamUrl, true);
    } else {
      setUnavailable('Flux direct non configuré pour cette chaîne.');
    }
  }

  async function loadSchedule() {
    const data = await api('/api/channels/' + encodeURIComponent(channelId) + '/programs');
    occurrences = Array.isArray(data.occurrences) ? data.occurrences : [];

    $('epgDate').textContent = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date());
    renderEPG(occurrences);
  }

  async function loadCatalog() {
    const data = await api('/api/channels/' + encodeURIComponent(channelId) + '/catalog');
    const programs = data.programs || [];
    const container = $('catalogContainer');
    container.replaceChildren();

    if (!programs.length) {
      const p = document.createElement('p');
      p.className = 'empty-msg';
      p.textContent = 'Aucun programme habituel confirmé par la source EPG.';
      container.appendChild(p);
      return;
    }

    for (const program of programs) {
      const card = document.createElement('article');
      card.className = 'catalog-card';

      if (program.poster) {
        const poster = document.createElement('img');
        poster.className = 'catalog-poster';
        poster.src = program.poster;
        poster.alt = program.title;
        poster.loading = 'lazy';
        poster.referrerPolicy = 'no-referrer';
        poster.addEventListener('error', () => poster.remove(), { once: true });
        card.appendChild(poster);
      }

      const info = document.createElement('div');
      const title = document.createElement('h4');
      title.textContent = program.title;

      const meta = document.createElement('p');
      meta.textContent = program.type + ' • ' + program.occurrencesCount + ' occurrence(s)';
      info.append(title, meta);

      const currentOccurrence = occurrences.find(item =>
        item.programId === program.programId && isLiveNow(item)
      );
      const programOccurrence = currentOccurrence || occurrences.find(item =>
        item.programId === program.programId
      );

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = program.playbackUrl || currentOccurrence ? '▶ Regarder' : 'Indisponible';
      button.disabled = !program.playbackUrl && !currentOccurrence;
      if (!button.disabled && programOccurrence) {
        button.addEventListener('click', () => handleWatch(program, programOccurrence));
      } else if (program.playbackUrl) {
        // Pas d'occurrence EPG : aucune résolution de lecture côté client.
        button.disabled = true;
        button.textContent = 'Indisponible';
      }

      card.append(info, button);
      container.appendChild(card);
    }
  }

  function renderEPG(items) {
    const container = $('epgContainer');
    container.replaceChildren();

    if (!items.length) {
      const p = document.createElement('p');
      p.className = 'empty-msg';
      p.textContent = 'Aucun programme EPG réel disponible.';
      container.appendChild(p);
      return;
    }

    const now = Date.now();
    const current = items.find(item => isLiveNow(item)) || null;

    if (current) updateProgram(current, true);

    for (const occurrence of items.slice(0, 100)) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'epg-item' + (current?.occurrenceId === occurrence.occurrenceId ? ' active' : '');

      const time = document.createElement('span');
      time.className = 'epg-time';
      time.textContent = formatTime(occurrence.startAt);

      const info = document.createElement('span');
      info.className = 'epg-info';

      const title = document.createElement('h4');
      title.textContent = occurrence.title || occurrence.subtitle || 'Titre non fourni par la source EPG';

      const desc = document.createElement('p');
      if (occurrence.seasonNumber != null && occurrence.episodeNumber != null) {
        desc.textContent = 'S' + occurrence.seasonNumber + ' • E' + occurrence.episodeNumber;
      } else {
        desc.textContent = formatRange(occurrence.startAt, occurrence.endAt);
      }

      info.append(title, desc);

      const status = document.createElement('span');
      status.className = 'status-icon';
      status.textContent = current?.occurrenceId === occurrence.occurrenceId ? '▶' : '';

      item.append(time, info, status);

      item.addEventListener('click', async () => {
        document.querySelectorAll('.epg-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');

        const live = isLiveNow(occurrence);
        updateProgram(occurrence, live);

        await resolveAndPlay(occurrence.programId, occurrence.occurrenceId);
      });

      container.appendChild(item);
    }
  }

  function updateProgram(program, isLive) {
    $('currentProgramTitle').textContent =
      program.title || program.subtitle || 'Titre non fourni par la source EPG';
    $('currentProgramTime').textContent = formatRange(program.startAt, program.endAt);
    $('currentProgramDesc').textContent = program.description || '';
    $('liveBadge').textContent = isLive ? 'LIVE' : 'PROGRAMME';
  }

  async function handleWatch(program, selectedOccurrence = null) {
    const occurrence = selectedOccurrence || occurrences.find(
      item => item.programId === program.programId && isLiveNow(item)
    ) || occurrences.find(item => item.programId === program.programId);

    if (!occurrence) {
      setUnavailable('Aucune occurrence EPG réelle disponible pour ce contenu.');
      return;
    }

    await resolveAndPlay(program.programId, occurrence.occurrenceId); 
  }

  async function resolveAndPlay(programId, occurrenceId) {
    if (occurrenceId == null) {
      setUnavailable('Occurrence EPG requise pour la lecture.');
      return;
    }

    const query = new URLSearchParams({
      channelId,
      occurrenceId: String(occurrenceId)
    });

    try {
      const data = await api('/api/programs/resolve-playback?' + query.toString());

      if (data.mode === 'VOD' || data.mode === 'LIVE') {
        play(data.playbackUrl, data.mode === 'LIVE');
        $('statusMessage')?.replaceChildren();
        return;
      }

      setUnavailable(data.message || 'Non disponible à la demande.');
    } catch (error) {
      console.error('[Channel playback]', error);
      setUnavailable('Source vidéo non disponible.');
    }
  }

  function setUnavailable(message) {
    if (hls) {
      hls.destroy();
      hls = null;
    }

    const video = $('videoPlayer');
    video.pause();
    video.removeAttribute('src');
    video.load();

    $('liveBadge').textContent = 'INDISPONIBLE';

    const status = $('statusMessage');
    if (status) {
      status.className = 'status-badge unavailable';
      status.textContent = message;
    }
  }

  function isLiveNow(item) {
    const start = Date.parse(item.startAt);
    const end = Date.parse(item.endAt || '');
    const now = Date.now();

    return !Number.isNaN(start) &&
      start <= now &&
      (Number.isNaN(end) || now < end);
  }

  function play(url, live) {
    if (!url) {
      setUnavailable('Aucune source vidéo autorisée.');
      return;
    }

    $('liveBadge').textContent = live ? 'LIVE' : 'VOD';

    if (hls) {
      hls.destroy();
      hls = null;
    }

    const video = $('videoPlayer');
    video.removeAttribute('src');
    video.load();

    if (window.Hls && Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
        else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
      });
      return;
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      }, { once: true });
    }
  }

  function formatTime(value) {
    const d = new Date(value);
    return Number.isNaN(d.getTime())
      ? '--:--'
      : new Intl.DateTimeFormat('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        }).format(d);
  }

  function formatRange(start, end) {
    return formatTime(start) + (end ? ' - ' + formatTime(end) : '');
  }

  function setupFavorite() {
    const key = 'streamlive-favorite-' + channelId;
    const button = $('favBtn');
    const active = localStorage.getItem(key) === '1';

    button.classList.toggle('active', active);
    button.textContent = active ? '♥ Favori' : '♡ Favoris';

    button.addEventListener('click', () => {
      const next = localStorage.getItem(key) !== '1';
      localStorage.setItem(key, next ? '1' : '0');
      button.classList.toggle('active', next);
      button.textContent = next ? '♥ Favori' : '♡ Favoris';
    });
  }
})();
