(() => {
  'use strict';

  const state = {
    channels: [],
    group: 'all',
    query: '',
    selected: new Map(),
    updatedAt: null
  };

  const $ = id => document.getElementById(id);

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    $('refreshBtn').addEventListener('click', loadChannels);
    $('clearMultiBtn').addEventListener('click', clearMulti);
    $('liveSearch').addEventListener('input', event => {
      state.query = event.target.value.trim().toLowerCase();
      renderChannels();
    });

    document.querySelectorAll('.filter').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        state.group = button.dataset.group || 'all';
        renderChannels();
      });
    });

    await loadChannels();
    window.setInterval(loadChannels, 60 * 1000);
  }

  async function api(url) {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin'
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      throw new Error(data.error || data.message || 'Données LIVE indisponibles.');
    }
    return data;
  }

  async function loadChannels() {
    try {
      $('channelList').innerHTML = '<div class="loading-card">Actualisation des chaînes…</div>';
      const data = await api('/api/live/channels');
      state.channels = Array.isArray(data.channels) ? data.channels : [];
      state.updatedAt = data.fetchedAt || null;
      syncSelectedWithFreshData();
      renderChannels();
      renderMultiLive();
    } catch (error) {
      console.error('[StreamLive LIVE]', error);
      if (!state.channels.length) {
        $('channelList').innerHTML = '<div class="empty-card">Impossible de charger la navigation LIVE.</div>';
      }
    }
  }

  function syncSelectedWithFreshData() {
    for (const [channelId, item] of state.selected) {
      const fresh = state.channels.find(channel => channel.id === channelId);
      if (!fresh || !fresh.liveAvailable || !fresh.occurrence) {
        removeSelected(channelId);
      } else {
        item.channel = fresh;
      }
    }
  }

  function filteredChannels() {
    return state.channels.filter(channel => {
      const inGroup = state.group === 'all' || channel.group === state.group;
      const haystack = (channel.name + ' ' + channel.group + ' ' + (channel.occurrence?.title || '')).toLowerCase();
      return inGroup && (!state.query || haystack.includes(state.query));
    });
  }

  function renderChannels() {
    const list = $('channelList');
    const channels = filteredChannels();
    $('channelCount').textContent = state.channels.length + ' chaînes';

    list.replaceChildren();

    if (!channels.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-card';
      empty.textContent = 'Aucune chaîne ne correspond à cette recherche.';
      list.appendChild(empty);
      return;
    }

    for (const channel of channels) {
      list.appendChild(createChannelRow(channel));
    }
  }

  function createChannelRow(channel) {
    const row = document.createElement('article');
    row.className = 'channel-row' + (channel.liveAvailable ? '' : ' no-live');

    const poster = document.createElement('div');
    poster.className = 'channel-poster';

    const occurrence = channel.occurrence;
    if (occurrence?.poster) {
      const img = document.createElement('img');
      img.src = occurrence.poster;
      img.alt = '';
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.addEventListener('error', () => renderLogoFallback(poster, channel), { once: true });
      poster.appendChild(img);
    } else {
      renderLogo(poster, channel);
    }

    if (channel.liveAvailable) {
      const dot = document.createElement('span');
      dot.className = 'live-dot';
      dot.textContent = 'DIRECT';
      poster.appendChild(dot);
    }

    if (occurrence?.startAt && occurrence?.endAt) {
      const progress = document.createElement('div');
      progress.className = 'progress';
      const fill = document.createElement('i');
      fill.style.width = progressPercent(occurrence) + '%';
      progress.appendChild(fill);
      poster.appendChild(progress);
    }

    const info = document.createElement('div');
    info.className = 'channel-info';

    const name = document.createElement('div');
    name.className = 'channel-name';

    const number = document.createElement('span');
    number.className = 'channel-number';
    number.textContent = '#' + channel.number;

    name.append(number, document.createTextNode(channel.name));
    info.appendChild(name);

    const title = document.createElement('div');
    title.className = 'program-title';
    title.textContent = occurrence?.title || 'Aucun programme EPG en cours';
    info.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'program-meta';
    meta.textContent = occurrence ? formatMeta(occurrence) : 'Programme non fourni par la source EPG';
    info.appendChild(meta);

    const status = document.createElement('div');
    status.className = 'channel-state';
    status.textContent = channel.liveAvailable
      ? 'Flux LIVE réel disponible'
      : occurrence
        ? 'Programme détecté — flux LIVE non disponible'
        : 'Aucun programme EPG en cours';
    info.appendChild(status);

    const actions = document.createElement('div');
    actions.className = 'channel-actions';

    const watch = document.createElement('button');
    watch.type = 'button';
    watch.className = 'watch-btn';
    watch.textContent = '▶ Regarder';
    watch.disabled = !channel.liveAvailable;
    watch.addEventListener('click', () => addToMulti(channel.id, true));

    const multi = document.createElement('button');
    multi.type = 'button';
    multi.className = 'multi-btn';
    const selected = state.selected.has(channel.id);
    multi.classList.toggle('selected', selected);
    multi.textContent = selected ? '✓ Multi-Live' : '+ Multi-Live';
    multi.disabled = !channel.liveAvailable;
    multi.addEventListener('click', () => addToMulti(channel.id, false));

    actions.append(watch, multi);
    row.append(poster, info, actions);

    return row;
  }

  function renderLogo(container, channel) {
    const img = document.createElement('img');
    img.className = 'logo-only';
    img.alt = channel.name + ' — logo';
    img.loading = 'lazy';
    img.src = channel.logoUrl || '';
    img.addEventListener('error', () => renderLogoFallback(container, channel), { once: true });
    container.appendChild(img);
  }

  function renderLogoFallback(container, channel) {
    container.replaceChildren();
    const fallback = document.createElement('div');
    fallback.className = 'poster-fallback';
    fallback.textContent = initials(channel.name);
    container.appendChild(fallback);
  }

  function addToMulti(channelId, focus) {
    const channel = state.channels.find(item => item.id === channelId);
    if (!channel?.liveAvailable || !channel.occurrence?.occurrenceId) return;

    if (state.selected.has(channelId)) {
      removeSelected(channelId);
    } else {
      state.selected.set(channelId, {
        channel,
        video: null,
        hls: null,
        requestId: 0
      });
      renderMultiLive();
    }

    renderChannels();
    if (focus) $('multiLive').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function removeSelected(channelId) {
    const item = state.selected.get(channelId);
    if (!item) return;
    stopItem(item);
    state.selected.delete(channelId);
  }

  function clearMulti() {
    for (const item of state.selected.values()) stopItem(item);
    state.selected.clear();
    renderMultiLive();
    renderChannels();
  }

  function renderMultiLive() {
    const grid = $('multiLiveGrid');
    const empty = $('multiLiveEmpty');
    grid.replaceChildren();

    empty.style.display = state.selected.size ? 'none' : 'block';

    for (const [channelId, item] of state.selected) {
      const card = document.createElement('article');
      card.className = 'multi-live-card';

      const video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.autoplay = true;
      video.muted = false;
      video.preload = 'metadata';
      item.video = video;

      const meta = document.createElement('div');
      meta.className = 'multi-live-meta';

      const title = document.createElement('div');
      title.className = 'multi-live-title';

      const strong = document.createElement('strong');
      strong.textContent = item.channel.name;

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'remove-live';
      remove.setAttribute('aria-label', 'Retirer ' + item.channel.name);
      remove.textContent = '×';
      remove.addEventListener('click', () => {
        removeSelected(channelId);
        renderMultiLive();
        renderChannels();
      });

      title.append(strong, remove);

      const program = document.createElement('div');
      program.className = 'multi-live-program';
      program.textContent = item.channel.occurrence?.title || 'Programme EPG';

      meta.append(title, program);
      card.append(video, meta);
      grid.appendChild(card);

      resolveAndPlay(item);
    }
  }

  async function resolveAndPlay(item) {
    const channel = item.channel;
    const occurrenceId = channel.occurrence?.occurrenceId;
    if (!occurrenceId || !channel.id) return;

    const requestId = ++item.requestId;
    stopSource(item);

    try {
      const params = new URLSearchParams({
        channelId: String(channel.id),
        occurrenceId: String(occurrenceId)
      });

      const data = await api('/api/programs/resolve-playback?' + params.toString());

      if (requestId !== item.requestId || !item.video) return;

      if (data.mode !== 'LIVE' || !data.playbackUrl) {
        showVideoMessage(item.video, 'Ce programme LIVE n’est plus disponible.');
        return;
      }

      attachSource(item, data.playbackUrl);
    } catch (error) {
      if (requestId !== item.requestId || !item.video) return;
      console.error('[StreamLive multi-live]', error);
      showVideoMessage(item.video, 'Flux LIVE indisponible.');
    }
  }

  function attachSource(item, url) {
    const video = item.video;
    const isHls = /\.m3u8(?:$|[?#])/i.test(url);

    if (isHls && window.Hls && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30
      });
      item.hls = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data?.fatal) return;
        showVideoMessage(video, 'Le flux LIVE est devenu indisponible.');
        stopSource(item);
      });

      hls.loadSource(url);
      hls.attachMedia(video);
      return;
    }

    if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.play().catch(() => {});
      return;
    }

    if (!isHls) {
      video.src = url;
      video.play().catch(() => {});
      return;
    }

    showVideoMessage(video, 'HLS n’est pas pris en charge sur cet appareil.');
  }

  function showVideoMessage(video, message) {
    video.controls = true;
    video.removeAttribute('src');
    video.poster = '';
    video.setAttribute('data-state', message);
  }

  function stopSource(item) {
    if (item.hls) {
      item.hls.destroy();
      item.hls = null;
    }
    if (item.video) {
      item.video.pause();
      item.video.removeAttribute('src');
      item.video.load();
    }
  }

  function stopItem(item) {
    ++item.requestId;
    stopSource(item);
    item.video = null;
  }

  function progressPercent(occurrence) {
    const start = Date.parse(occurrence.startAt);
    const end = Date.parse(occurrence.endAt);
    const now = Date.now();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 0;
    return Math.max(0, Math.min(100, ((now - start) / (end - start)) * 100));
  }

  function formatMeta(occurrence) {
    const start = time(occurrence.startAt);
    const end = time(occurrence.endAt);
    const range = [start, end].filter(Boolean).join(' - ');
    const episode = occurrence.seasonNumber != null && occurrence.episodeNumber != null
      ? 'S' + occurrence.seasonNumber + ' E' + occurrence.episodeNumber
      : '';
    return [range, episode, occurrence.subtitle || ''].filter(Boolean).join(' • ');
  }

  function time(value) {
    if (!value) return '';
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? ''
      : date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  function initials(name) {
    return String(name || '?')
      .split(/\s+/)
      .map(part => part[0] || '')
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }

  window.StreamLiveLive = {
    refresh: loadChannels,
    clearMulti
  };
})();
