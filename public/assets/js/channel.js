(() => {
  const path = window.location.pathname.split('/').filter(Boolean);
  const params = new URLSearchParams(window.location.search);
  const channelId = path[0] === 'channel' ? path[1] : params.get('id');

  const $ = id => document.getElementById(id);
  let hls = null;
  let channel = null;

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
      console.error('[Channel] ', error);
      $('currentProgramTitle').textContent = 'Erreur de chargement';
      $('currentProgramDesc').textContent = 'Impossible de récupérer les données de cette chaîne.';
    }
  });

  async function api(url) {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await response.json();
    if (!response.ok || data.success === false) throw new Error(data.message || data.error || 'Erreur API');
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
    play(channel.streamUrl, true);
  }

  async function loadSchedule() {
    const data = await api('/api/channels/' + encodeURIComponent(channelId) + '/programs');
    const occurrences = Array.isArray(data.occurrences) ? data.occurrences : [];
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
      p.textContent = 'Aucun programme habituel confirmé pour le moment.';
      container.appendChild(p);
      return;
    }

    for (const program of programs) {
      const card = document.createElement('article');
      card.className = 'catalog-card';

      const info = document.createElement('div');
      const title = document.createElement('h4');
      title.textContent = program.title;
      const meta = document.createElement('p');
      meta.textContent = program.type + ' • ' + program.occurrencesCount + ' occurrence(s)';
      info.append(title, meta);

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = program.playbackUrl ? '▶ Regarder' : 'Voir le programme';
      button.disabled = !program.playbackUrl;
      if (program.playbackUrl) button.addEventListener('click', () => selectContent(program.programId));

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
      p.textContent = 'Aucun programme EPG disponible.';
      container.appendChild(p);
      return;
    }

    const now = Date.now();
    let current = null;

    for (const occurrence of items) {
      const start = Date.parse(occurrence.startAt);
      const end = Date.parse(occurrence.endAt || '');
      if (!Number.isNaN(start) && start <= now && (!Number.isNaN(end) ? now < end : true)) {
        current = occurrence;
      }
    }

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
      title.textContent = occurrence.subtitle || 'Programme';
      const desc = document.createElement('p');
      desc.textContent = occurrence.seasonNumber != null
        ? 'S' + occurrence.seasonNumber + ' • E' + occurrence.episodeNumber
        : formatRange(occurrence.startAt, occurrence.endAt);
      info.append(title, desc);

      const status = document.createElement('span');
      status.className = 'status-icon';
      status.textContent = current?.occurrenceId === occurrence.occurrenceId ? '▶' : '';

      item.append(time, info, status);
      item.addEventListener('click', () => {
        document.querySelectorAll('.epg-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        updateProgram(occurrence, current?.occurrenceId === occurrence.occurrenceId);
        if (current?.occurrenceId === occurrence.occurrenceId || isLiveNow(occurrence)) {
          play(channel.streamUrl, true);
        }
      });
      container.appendChild(item);
    }
  }

  function updateProgram(program, isLive) {
    $('currentProgramTitle').textContent = program.subtitle || 'Programme';
    $('currentProgramTime').textContent = formatRange(program.startAt, program.endAt);
    $('currentProgramDesc').textContent = program.description || 'Pas de description disponible.';
    $('liveBadge').textContent = isLive ? 'LIVE' : 'PROGRAMME';
  }

  async function selectContent(programId) {
    const data = await api('/api/programs/' + encodeURIComponent(programId));
    const program = data.program;
    if (program.playbackUrl) {
      play(program.playbackUrl, false);
      updateProgram({ subtitle: program.title, description: program.description }, false);
    }
  }

  function isLiveNow(item) {
    const start = Date.parse(item.startAt);
    const end = Date.parse(item.endAt || '');
    const now = Date.now();
    return !Number.isNaN(start) && start <= now && (Number.isNaN(end) || now < end);
  }

  function play(url, live) {
    if (!url) return;
    $('liveBadge').textContent = live ? 'LIVE' : 'VOD';

    if (hls) {
      hls.destroy();
      hls = null;
    }
    $('videoPlayer').removeAttribute('src');

    if (window.Hls && Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(url);
      hls.attachMedia($('videoPlayer'));
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        $('videoPlayer').play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
        else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
      });
      return;
    }

    if ($('videoPlayer').canPlayType('application/vnd.apple.mpegurl')) {
      $('videoPlayer').src = url;
      $('videoPlayer').addEventListener('loadedmetadata', () => {
        $('videoPlayer').play().catch(() => {});
      }, { once: true });
    }
  }

  function formatTime(value) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? '--:--' : new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(d);
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
