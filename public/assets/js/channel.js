(() => {
  'use strict';

  const path = window.location.pathname.split('/').filter(Boolean);
  const params = new URLSearchParams(window.location.search);
  const channelId = path[0] === 'channel' ? path[1] : params.get('id');
  const $ = id => document.getElementById(id);

  let channel = null;
  let occurrences = [];
  let programs = [];
  let currentProgram = null;
  let currentOccurrence = null;
  let currentSeason = null;
  let hls = null;
  let epgSource = null;
  let epgWarning = null;

  if (!channelId) {
    window.location.replace('/');
    return;
  }

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    $('backBtn').addEventListener('click', () => window.history.length > 1 ? history.back() : window.location.assign('/'));
    $('openProgramsBtn').addEventListener('click', openCatalog);
    $('closeProgramsBtn').addEventListener('click', closeCatalog);
    $('closeProgramBtn').addEventListener('click', closeProgram);
    $('playBtn').addEventListener('click', () => {
      if (currentOccurrence) resolveAndPlay(currentOccurrence.occurrenceId);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
        renderPosterGrid(btn.dataset.filter);
      });
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    try {
      await loadChannel();
      await loadPrograms();
    } catch (error) {
      console.error('[StreamLive channel]', error);
      showState(error.message || 'Données EPG indisponibles.');
    }
  }

  async function api(url) {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    let data = null;
    try { data = await response.json(); } catch {}
    if (!response.ok || data?.success === false) {
      throw new Error(data?.error || data?.message || 'Erreur API');
    }
    return data;
  }

  async function loadChannel() {
    const data = await api('/api/channels/' + encodeURIComponent(channelId));
    channel = data.channel;

    document.title = 'StreamLive — ' + channel.name;
    $('channelLogo').src = channel.logoUrl || '';
    $('channelLogo').alt = channel.name;
    $('channelLogo').hidden = !channel.logoUrl;
    $('hero').style.setProperty('--hero-image', channel.logoUrl ? 'none' : 'linear-gradient(160deg,#15191d,#0b0d0f)');
  }

  async function loadPrograms() {
    const data = await api('/api/channels/' + encodeURIComponent(channelId) + '/programs');
    occurrences = Array.isArray(data.occurrences) ? data.occurrences : [];
    programs = Array.isArray(data.programs) ? data.programs : [];
    epgSource = data.source || null;
    epgWarning = data.warning || null;

    renderChannelRows();
    renderEPG();
  }

  function renderChannelRows() {
    const rows = $('rows');
    rows.replaceChildren();

    const live = occurrences.find(isLiveNow);
    if (live) {
      const section = makeRow('En ce moment', [live.programId]);
      rows.appendChild(section);
      selectOccurrence(live, false);
    }

    const recurring = programs.filter(p => p.isRecurring);
    if (recurring.length) {
      rows.appendChild(makeRow('Programmes habituels', recurring.map(p => p.programId)));
    }

    const upcoming = occurrences
      .filter(o => Date.parse(o.startAt) > Date.now())
      .slice(0, 12);

    if (upcoming.length) {
      rows.appendChild(makeRow('À venir', [...new Set(upcoming.map(o => o.programId))]));
    }

    if (epgSource === 'synthetic-fallback' && programs.length) {
      rows.appendChild(makeRow('Grille EPG de secours', programs.map(p => p.programId)));
      appendState(epgWarning || 'Grille synthétique affichée : aucune occurrence EPG réelle disponible.');
    } else if (!rows.children.length) {
      showState('Aucun programme EPG réel disponible pour cette chaîne.');
    }
  }

  function makeRow(titleText, ids) {
    const section = document.createElement('section');
    section.className = 'row';

    const title = document.createElement('h2');
    title.className = 'row-title';
    title.textContent = titleText;
    section.appendChild(title);

    const track = document.createElement('div');
    track.className = 'row-track';

    for (const id of ids) {
      const program = programs.find(p => p.programId === id);
      if (!program) continue;

      const occurrence = occurrences.find(o => o.programId === id && isLiveNow(o))
        || occurrences.find(o => o.programId === id);

      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'tile wide';

      if (program.poster) {
        const img = document.createElement('img');
        img.src = program.poster;
        img.alt = program.title;
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        img.addEventListener('error', () => img.remove(), { once: true });
        tile.appendChild(img);
      } else {
        const empty = document.createElement('span');
        empty.className = 'tile-no-poster';
        empty.textContent = program.title;
        tile.appendChild(empty);
      }

      tile.addEventListener('click', () => openProgram(program, occurrence));
      track.appendChild(tile);
    }

    section.appendChild(track);
    return section;
  }

  function renderEPG() {
    const state = document.createElement('div');
    const existing = $('rows').querySelector('.state-block');
    if (existing) existing.remove();
  }

  function openCatalog() {
    $('programs-view').classList.remove('hidden');
    $('programs-view').setAttribute('aria-hidden', 'false');
    renderPosterGrid('all');
  }

  function closeCatalog() {
    $('programs-view').classList.add('hidden');
    $('programs-view').setAttribute('aria-hidden', 'true');
  }

  function renderPosterGrid(filter) {
    const grid = $('posterGrid');
    grid.replaceChildren();

    const filtered = programs.filter(program => matchesFilter(program, filter));
    if (!filtered.length) {
      const p = document.createElement('p');
      p.className = 'empty-msg';
      p.textContent = 'Aucun programme confirmé correspondant à ce filtre.';
      grid.appendChild(p);
      return;
    }

    for (const program of filtered) {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'poster-tile';

      if (program.poster) {
        const img = document.createElement('img');
        img.src = program.poster;
        img.alt = program.title;
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        img.addEventListener('error', () => img.remove(), { once: true });
        tile.appendChild(img);
      } else {
        const noPoster = document.createElement('div');
        noPoster.className = 'poster-no-image';
        noPoster.textContent = program.title;
        tile.appendChild(noPoster);
      }

      const caption = document.createElement('div');
      caption.className = 'poster-caption';
      caption.textContent = program.title;

      const kind = document.createElement('span');
      kind.className = 'kind';
      kind.textContent = displayType(program.type);
      caption.prepend(kind);

      tile.appendChild(caption);
      tile.addEventListener('click', () => {
        const occurrence = occurrences.find(o => o.programId === program.programId && isLiveNow(o))
          || occurrences.find(o => o.programId === program.programId);
        openProgram(program, occurrence);
      });
      grid.appendChild(tile);
    }
  }

  function matchesFilter(program, filter) {
    if (filter === 'all') return true;
    const type = normalizeType(program.type);
    if (filter === 'film') return type === 'film';
    if (filter === 'serie') return type === 'serie';
    if (filter === 'novela') return type === 'novela';
    return false;
  }

  function normalizeType(type) {
    const value = String(type || '').trim().toLowerCase();
    if (['film', 'movie', 'long-metrage', 'long métrage'].includes(value)) return 'film';
    if (['series', 'serie', 'série', 'show'].includes(value)) return 'serie';
    if (['novela', 'telenovela'].includes(value)) return 'novela';
    return value;
  }

  function displayType(type) {
    const normalized = normalizeType(type);
    return normalized === 'film' ? 'Film'
      : normalized === 'serie' ? 'Série'
      : normalized === 'novela' ? 'Novela'
      : String(type || 'Programme');
  }

  async function openProgram(program, occurrence) {
    currentProgram = program;
    currentOccurrence = occurrence || null;

    $('program-view').classList.remove('hidden');
    $('program-view').setAttribute('aria-hidden', 'false');
    $('programTitle').textContent = program.title || 'Titre non fourni par la source EPG';
    $('programDesc').textContent = program.description || '';
    $('programCredits').textContent = '';

    const meta = $('programMeta');
    meta.replaceChildren();
    addMeta(meta, displayType(program.type));
    if (program.distinctDaysCount != null) addMeta(meta, program.distinctDaysCount + ' jour(s) observé(s)');
    if (program.isRecurring) addMeta(meta, 'Programme confirmé');

    if (program.poster) {
      $('programHero').style.setProperty('--hero-image', 'url(' + program.poster.replace(/'/g, "\\\\'") + ')');
    } else {
      $('programHero').style.removeProperty('--hero-image');
    }

    updatePlayState();
    await loadEpisodes(program);
    window.scrollTo(0, 0);
  }

  function addMeta(container, value) {
    const span = document.createElement('span');
    span.textContent = value;
    container.appendChild(span);
  }

  async function loadEpisodes(program) {
    const all = occurrences.filter(o => o.programId === program.programId && o.seasonNumber != null && o.episodeNumber != null);
    const tabs = $('seasonTabs');
    const list = $('episodeList');
    tabs.replaceChildren();
    list.replaceChildren();

    if (normalizeType(program.type) === 'film') {
      $('programTabs').classList.add('hidden');
      $('tab-episodes').classList.add('hidden');
      return;
    }

    $('programTabs').classList.remove('hidden');
    $('tab-episodes').classList.remove('hidden');

    if (!all.length) {
      $('seasonCount').textContent = '';
      const p = document.createElement('p');
      p.className = 'empty-msg';
      p.textContent = 'Aucune saison ou épisode fourni par la source EPG.';
      list.appendChild(p);
      $('playLabel').textContent = currentOccurrence ? 'Voir le programme' : 'Lecture indisponible';
      return;
    }

    const seasons = [...new Set(all.map(o => o.seasonNumber))].sort((a,b) => a-b);
    currentSeason = seasons[0];

    for (const season of seasons) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'season-btn' + (season === currentSeason ? ' active' : '');
      button.textContent = 'Saison ' + season;
      button.addEventListener('click', () => {
        currentSeason = season;
        renderSeasonButtons(seasons);
        renderEpisodes(all, season);
      });
      tabs.appendChild(button);
    }

    renderSeasonButtons(seasons);
    renderEpisodes(all, currentSeason);
  }

  function renderSeasonButtons(seasons) {
    [...$('seasonTabs').children].forEach((button, index) => {
      button.classList.toggle('active', seasons[index] === currentSeason);
    });
  }

  function renderEpisodes(all, season) {
    const list = $('episodeList');
    list.replaceChildren();

    const items = all.filter(o => o.seasonNumber === season).sort((a,b) => a.episodeNumber - b.episodeNumber);
    $('seasonCount').textContent = items.length + ' épisode(s) fourni(s) par l’EPG';

    for (const ep of items) {
      const row = document.createElement('article');
      row.className = 'episode';

      if (ep.poster) {
        const img = document.createElement('img');
        img.className = 'episode-thumb';
        img.src = ep.poster;
        img.alt = ep.subtitle || ep.title || '';
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        img.addEventListener('error', () => img.remove(), { once: true });
        row.appendChild(img);
      } else {
        const blank = document.createElement('div');
        blank.className = 'episode-thumb episode-no-poster';
        row.appendChild(blank);
      }

      const info = document.createElement('div');
      info.className = 'episode-info';

      const h3 = document.createElement('h3');
      h3.textContent = 'Épisode ' + ep.episodeNumber;
      info.appendChild(h3);

      if (ep.subtitle) {
        const title = document.createElement('div');
        title.className = 'ep-title';
        title.textContent = ep.subtitle;
        info.appendChild(title);
      }

      const duration = document.createElement('div');
      duration.className = 'duration';
      if (ep.durationMinutes != null) duration.textContent = ep.durationMinutes + ' min';
      info.appendChild(duration);

      if (ep.description) {
        const desc = document.createElement('p');
        desc.className = 'ep-desc';
        desc.textContent = ep.description;
        info.appendChild(desc);
      }

      row.appendChild(info);

      const play = document.createElement('button');
      play.type = 'button';
      play.className = 'episode-play';
      play.textContent = '▶';
      play.disabled = !isLiveNow(ep);
      play.title = play.disabled ? 'Lecture non disponible pour cette occurrence' : 'Lire';
      if (!play.disabled) play.addEventListener('click', () => {
        currentOccurrence = ep;
        updatePlayState();
        resolveAndPlay(ep.occurrenceId);
      });
      row.appendChild(play);
      list.appendChild(row);
    }
  }

  function updatePlayState() {
    const label = $('playLabel');
    const button = $('playBtn');
    button.disabled = !currentOccurrence;

    if (!currentOccurrence) {
      label.textContent = 'Lecture indisponible';
    } else {
      label.textContent = normalizeType(currentProgram?.type) === 'film'
        ? 'Voir le film'
        : currentOccurrence.seasonNumber != null && currentOccurrence.episodeNumber != null
          ? 'Voir Épisode ' + currentOccurrence.episodeNumber + ' — Saison ' + currentOccurrence.seasonNumber
          : 'Voir le programme';
    }
  }

  async function selectOccurrence(occurrence, autoplay) {
    currentOccurrence = occurrence;
    const program = programs.find(p => p.programId === occurrence.programId);
    if (program) {
      currentProgram = program;
      updateProgramText(occurrence);
      updatePlayState();
      if (autoplay && isLiveNow(occurrence)) await resolveAndPlay(occurrence.occurrenceId);
    }
  }

  function updateProgramText(occurrence) {
    const program = programs.find(p => p.programId === occurrence.programId);
    if ($('programTitle') && program) $('programTitle').textContent = program.title || '';
    if ($('programDesc')) $('programDesc').textContent = occurrence.description || program?.description || '';
  }

  async function resolveAndPlay(occurrenceId) {
    const query = new URLSearchParams({
      channelId,
      occurrenceId: String(occurrenceId)
    });

    try {
      const data = await api('/api/programs/resolve-playback?' + query.toString());
      if (data.mode === 'LIVE' || data.mode === 'VOD') {
        play(data.playbackUrl, data.mode === 'LIVE');
      } else {
        showToast(data.message || 'Aucune lecture réelle disponible.');
      }
    } catch (error) {
      console.error('[Playback]', error);
      showToast('Source vidéo non disponible.');
    }
  }

  function play(url, live) {
    if (!url) return;
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.src = url;
    video.style.cssText = 'position:fixed;inset:auto 16px 80px 16px;z-index:30;width:calc(100% - 32px);max-height:45vh;background:#000;border-radius:12px;';
    document.body.appendChild(video);

    if (hls) hls.destroy();
    if (window.Hls && Hls.isSupported() && /.m3u8(?:$|\?)/i.test(url)) {
      video.removeAttribute('src');
      hls = new Hls({ enableWorker: true, lowLatencyMode: live });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
    } else {
      video.play().catch(() => {});
    }

    video.addEventListener('ended', () => video.remove(), { once: true });
  }

  function closeProgram() {
    $('program-view').classList.add('hidden');
    $('program-view').setAttribute('aria-hidden', 'true');
    currentProgram = null;
    currentOccurrence = null;
  }

  function switchTab(name) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));
    $('tab-episodes').classList.toggle('hidden', name !== 'episodes');
    $('tab-more').classList.toggle('hidden', name !== 'more');
  }

  function showState(message) {
    const rows = $('rows');
    rows.replaceChildren();
    const block = document.createElement('section');
    block.className = 'state-block';
    block.textContent = message;
    rows.appendChild(block);
  }

  function appendState(message) {
    const block = document.createElement('section');
    block.className = 'state-block';
    block.textContent = message;
    $('rows').appendChild(block);
  }

  function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.add('hidden'), 3500);
  }

  function isLiveNow(item) {
    const start = Date.parse(item.startAt);
    const end = Date.parse(item.endAt || '');
    const now = Date.now();
    return Number.isFinite(start) && start <= now && (Number.isNaN(end) || now < end);
  }
})();
