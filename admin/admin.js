const login = document.getElementById('login');
const panel = document.getElementById('panel');
const error = document.getElementById('error');
let selectedChannelId = null;
let channelPrograms = [];

async function api(url, options) {
  const r = await fetch(url, { credentials: 'include', ...(options || {}) });
  const d = await r.json().catch(() => ({ success: false, error: 'Réponse invalide.' }));
  if (!r.ok) {
    const e = new Error(d.error || 'Accès refusé.');
    e.status = r.status;
    e.data = d;
    throw e;
  }
  return d;
}

function showLogin(message = '') {
  login.hidden = false;
  panel.hidden = true;
  error.textContent = message;
}

function showPanel() {
  login.hidden = true;
  panel.hidden = false;
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function localDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
}

async function loadDashboard() {
  const d = await api('/api/admin/dashboard');
  const labels = {
    channels: 'Chaînes en base',
    configuredChannels: 'Chaînes configurées',
    programs: 'Programmes',
    occurrences: 'Diffusions',
    mediaAssets: 'Médias',
    recordings: 'Enregistrements',
    recordingSegments: 'Segments',
    replayCatalog: 'Replays',
    episodes: 'Épisodes',
    movies: 'Films',
    series: 'Séries',
    subtitles: 'Sous-titres',
    audioTracks: 'Pistes audio'
  };
  document.getElementById('stats').innerHTML = Object.entries(labels)
    .map(([k, v]) => '<div class="stat"><b>' + Number(d.stats[k] || 0).toLocaleString('fr-FR') + '</b><span>' + v + '</span></div>')
    .join('');
  showPanel();
}

async function loadChannels() {
  const d = await api('/api/admin/channels');
  document.getElementById('channelCount').textContent = d.count + ' chaînes';
  document.getElementById('channels').innerHTML = d.channels.map(channel =>
    '<button class="channel" data-id="' + esc(channel.id) + '">' +
      '<img src="/assets/logos/' + encodeURIComponent(channel.id) + '.png" alt="" onerror="this.style.display=\'none\'">' +
      '<span>' + esc(channel.name) + '</span>' +
    '</button>'
  ).join('');
  document.querySelectorAll('.channel').forEach(button => {
    button.addEventListener('click', () => openChannel(button.dataset.id));
  });
}

async function openChannel(channelId) {
  selectedChannelId = channelId;
  const d = await api('/api/admin/channels/' + encodeURIComponent(channelId) + '/programs');
  channelPrograms = d.programs || [];
  document.getElementById('selectedChannel').textContent = d.channel.name;
  document.getElementById('channelPanel').hidden = false;
  renderPrograms();
  renderSchedule(d.occurrences || []);
  document.getElementById('scheduleProgram').innerHTML = channelPrograms.map(p =>
    '<option value="' + esc(p.programId) + '">' + esc(p.title) + '</option>'
  ).join('');
  window.scrollTo({ top: document.getElementById('channelPanel').offsetTop - 20, behavior: 'smooth' });
}

function renderPrograms() {
  const el = document.getElementById('programs');
  if (!channelPrograms.length) {
    el.innerHTML = '<p class="muted">Aucun programme enregistré pour cette chaîne.</p>';
    return;
  }
  el.innerHTML = channelPrograms.map(p =>
    '<div class="program"><div><b>' + esc(p.title) + '</b><small>' + esc(p.type) + ' · ' + esc(p.status) + '</small></div><span>' + Number(p.occurrencesCount || 0) + ' diffusions</span></div>'
  ).join('');
}

function renderSchedule(rows) {
  const el = document.getElementById('schedule');
  if (!rows.length) {
    el.innerHTML = '<p class="muted">Aucune diffusion programmée.</p>';
    return;
  }
  el.innerHTML = rows.map(row =>
    '<div class="slot"><div><b>' + esc(row.title) + '</b><small>' +
    (row.broadcastType === 'rerun' ? 'Rediffusion' : 'Première diffusion') + ' · ' +
    localDate(row.startAt) + ' → ' + localDate(row.endAt) +
    (row.subtitle ? ' · ' + esc(row.subtitle) : '') +
    '</small></div><button class="danger delete-slot" data-id="' + row.occurrenceId + '">Supprimer</button></div>'
  ).join('');
  document.querySelectorAll('.delete-slot').forEach(button => {
    button.addEventListener('click', async () => {
      if (!confirm('Supprimer cette programmation ?')) return;
      await api('/api/admin/schedule/' + button.dataset.id, { method: 'DELETE' });
      await openChannel(selectedChannelId);
      await loadDashboard();
    });
  });
}

document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();
  error.textContent = '';
  try {
    await api('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
      })
    });
    await loadDashboard();
    await loadChannels();
  } catch (e) {
    error.textContent = e.message;
  }
});

document.getElementById('programForm').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const d = await api('/api/admin/programs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channelId: selectedChannelId,
        title: document.getElementById('programTitle').value.trim(),
        type: document.getElementById('programType').value,
        description: document.getElementById('programDescription').value.trim()
      })
    });
    e.target.reset();
    await openChannel(selectedChannelId);
    alert('Programme ajouté : ' + d.program.title);
  } catch (e) {
    alert(e.message);
  }
});

document.getElementById('scheduleForm').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    await api('/api/admin/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channelId: selectedChannelId,
        programId: document.getElementById('scheduleProgram').value,
        broadcastType: document.getElementById('broadcastType').value,
        startAt: new Date(document.getElementById('startAt').value).toISOString(),
        endAt: new Date(document.getElementById('endAt').value).toISOString(),
        subtitle: document.getElementById('subtitle').value.trim()
      })
    });
    e.target.reset();
    await openChannel(selectedChannelId);
    await loadDashboard();
  } catch (e) {
    alert(e.message + (e.data?.conflict?.title ? '\nConflit avec : ' + e.data.conflict.title : ''));
  }
});

document.getElementById('closeChannel').addEventListener('click', () => {
  document.getElementById('channelPanel').hidden = true;
});

document.getElementById('logout').addEventListener('click', async () => {
  await api('/api/auth/logout', { method: 'POST' });
  showLogin();
});

loadDashboard().then(loadChannels).catch(e =>
  showLogin(e.status === 401 || e.status === 403 ? 'Connexion administrateur requise.' : e.message)
);
