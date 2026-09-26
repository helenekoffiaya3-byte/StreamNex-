const login = document.getElementById('login');
const panel = document.getElementById('panel');
const error = document.getElementById('error');
let selectedChannelId = null;
let channelPrograms = [];
let channels = [];
let editingChannelId = null;

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

let globalPrograms = [];
let selectedFeedPrograms = [];

async function searchAllPrograms() {
  const q = document.getElementById('globalProgramSearch').value.trim();
  const type = document.getElementById('globalTypeFilter').value;
  const params = new URLSearchParams({q, limit:'500'});
  if (type) params.set('type', type);
  const d = await api('/api/admin/programs/search?' + params.toString());
  globalPrograms = d.programs || [];
  document.getElementById('globalProgramCount').textContent = d.count + ' résultats';
  renderGlobalPrograms();
}
function renderGlobalPrograms() {
  document.getElementById('globalPrograms').innerHTML = globalPrograms.length
    ? globalPrograms.map(p => '<div class="program-choice"><span><b>'+esc(p.title)+'</b><small>'+esc(p.channelName||'Sans chaîne')+' · '+esc(p.type)+'</small></span><span class="program-actions"><button type="button" class="secondary add-program" data-id="'+esc(p.programId)+'">+</button><button type="button" class="primary broadcast-now" data-id="'+esc(p.programId)+'">Diffuser maintenant</button></span></div>').join('')
    : '<p class="muted">Aucun programme trouvé.</p>';

  document.querySelectorAll('.add-program').forEach(b => b.addEventListener('click', () => {
    const p=globalPrograms.find(x=>x.programId===b.dataset.id);
    if(p && !selectedFeedPrograms.some(x=>x.programId===p.programId)) {
      selectedFeedPrograms.push({programId:p.programId,title:p.title,channelName:p.channelName,playbackUrl:p.playbackUrl});
      renderSelectedFeedPrograms();
    }
  }));

  document.querySelectorAll('.broadcast-now').forEach(b => b.addEventListener('click', async () => {
    const p=globalPrograms.find(x=>x.programId===b.dataset.id);
    if(!p) return;
    b.disabled=true;
    try {
      const slug='direct-'+String(p.programId).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'-'+Date.now();
      const created=await api('/api/admin/feeds',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        name:'Direct · '+p.title, slug, description:'Diffusion immédiate depuis le catalogue StreamLive',
        loopEnabled:true, items:[{programId:p.programId}]
      })});
      const started=await api('/api/admin/feeds/'+encodeURIComponent(created.feed.feedId)+'/start',{method:'POST'});
      document.getElementById('feedResult').innerHTML='Diffusion démarrée : <b>'+esc(p.title)+'</b><br><code>'+esc(started.status.playbackUrl)+'</code>';
      await loadFeeds();
    } catch(e) {
      alert(e.message || 'Impossible de démarrer la diffusion.');
    } finally { b.disabled=false; }
  }));
}
function renderSelectedFeedPrograms() {
  document.getElementById('selectedFeedPrograms').innerHTML = selectedFeedPrograms.length
    ? selectedFeedPrograms.map((p,i)=>'<div class="feed-item"><span><b>'+(i+1)+'. '+esc(p.title)+'</b><small>'+esc(p.channelName||'')+'</small></span><button type="button" class="danger remove-feed" data-index="'+i+'">×</button></div>').join('')
    : '<p class="muted">Sélectionnez des programmes à gauche.</p>';
  document.querySelectorAll('.remove-feed').forEach(b=>b.addEventListener('click',()=>{selectedFeedPrograms.splice(Number(b.dataset.index),1);renderSelectedFeedPrograms();}));
}
async function loadFeeds() {
  const d=await api('/api/admin/feeds');
  document.getElementById('feeds').innerHTML=(d.feeds||[]).map(f=>{
    const running=f.engineStatus==='RUNNING';
    return '<div class="feed-card"><div><b>'+esc(f.name)+'</b><small>'+esc(f.slug)+' · '+f.itemCount+' programmes · moteur: '+esc(f.engineStatus||'STOPPED')+'</small><code>/hls/feeds/'+encodeURIComponent(f.feedId)+'/streamlive.m3u8</code></div><div class="actions"><button class="secondary toggle-feed" data-id="'+esc(f.feedId)+'" data-running="'+running+'">'+(running?'Arrêter':'Démarrer')+'</button><button class="secondary open-feed" data-url="/hls/feeds/'+encodeURIComponent(f.feedId)+'/streamlive.m3u8">Ouvrir le flux</button><button class="danger delete-feed" data-id="'+esc(f.feedId)+'">Supprimer</button></div></div>';
  }).join('') || '<p class="muted">Aucun flux créé.</p>';
  document.querySelectorAll('.toggle-feed').forEach(b=>b.addEventListener('click',async()=>{
    const action=b.dataset.running==='true'?'stop':'start';
    try { await api('/api/admin/feeds/'+encodeURIComponent(b.dataset.id)+'/'+action,{method:'POST'}); await loadFeeds(); }
    catch(e){ alert(e.message); }
  }));
  document.querySelectorAll('.open-feed').forEach(b=>b.addEventListener('click',()=>window.open(b.dataset.url,'_blank','noopener')));
  document.querySelectorAll('.delete-feed').forEach(b=>b.addEventListener('click',async()=>{if(!confirm('Supprimer ce flux ?'))return;await api('/api/admin/feeds/'+encodeURIComponent(b.dataset.id),{method:'DELETE'});await loadFeeds();}));
}
async function createFeed() {
  if(!selectedFeedPrograms.length) return alert('Sélectionnez au moins un programme.');
  const name=document.getElementById('feedName').value.trim();
  if(!name) return alert('Donnez un nom au flux.');
  const slug=document.getElementById('feedSlug').value.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const d=await api('/api/admin/feeds',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    name,slug,description:document.getElementById('feedDescription').value.trim(),
    channelId:document.getElementById('feedChannel').value||null,loopEnabled:document.getElementById('feedLoop').checked,
    items:selectedFeedPrograms.map(p=>({programId:p.programId}))
  })});
  document.getElementById('feedResult').textContent='Flux créé : '+d.feed.name+' · moteur prêt. Démarrez-le pour produire le HLS.';
  selectedFeedPrograms=[]; renderSelectedFeedPrograms(); await loadFeeds();
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
  channels = d.channels || [];
  document.getElementById('channelCount').textContent = d.count + ' chaînes';
  const groups = [...new Set(channels.map(c => c.groupName).filter(Boolean))].sort();
  document.getElementById('groupFilter').innerHTML = '<option value="">Tous les groupes</option>' + groups.map(g => '<option>' + esc(g) + '</option>').join('');
  renderChannels();
}
function renderChannels() {
  const q = document.getElementById('channelSearch').value.trim().toLowerCase();
  const g = document.getElementById('groupFilter').value;
  const list = channels.filter(c => (!g || c.groupName === g) && (!q || (c.name + ' ' + c.id).toLowerCase().includes(q)));
  document.getElementById('channels').innerHTML = list.map(c =>
    '<div class="channel-row"><button class="channel" data-id="' + esc(c.id) + '"><img src="' + esc(c.logoUrl || '/assets/logos/' + c.id + '.png') + '" alt="" onerror="this.style.display=\'none\'"><span><b>' + esc(c.name) + '</b><small>' + esc(c.groupName || 'Autre') + '</small></span></button><button class="secondary edit-channel" data-id="' + esc(c.id) + '">Modifier</button></div>'
  ).join('');
  document.querySelectorAll('.channel').forEach(b => b.addEventListener('click', () => openChannel(b.dataset.id)));
  document.querySelectorAll('.edit-channel').forEach(b => b.addEventListener('click', () => editChannel(b.dataset.id)));
}
function editChannel(id) {
  const c = channels.find(x => x.id === id); if (!c) return;
  editingChannelId = id;
  const f = document.getElementById('channelForm'); f.hidden = false;
  document.getElementById('channelFormTitle').textContent = 'Modifier la chaîne';
  document.getElementById('channelId').value = c.id; document.getElementById('channelId').disabled = true;
  document.getElementById('channelName').value = c.name || '';
  document.getElementById('channelGroup').value = c.groupName || 'Autre';
  document.getElementById('channelOrder').value = c.sortOrder ?? 0;
  document.getElementById('channelLogo').value = c.logoUrl || '';
  document.getElementById('channelStream').value = c.liveStreamUrl || '';
  document.getElementById('channelDescription').value = c.description || '';
  document.getElementById('channelActive').checked = Boolean(c.active);
  f.scrollIntoView({behavior:'smooth'});
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
    '<div class="program"><div><b>' + esc(p.title) + '</b><small>' + esc(p.type) + ' · ' + Number(p.occurrencesCount || 0) + ' diffusions</small></div><div class="actions"><button class="secondary edit-program" data-id="' + esc(p.programId) + '">Modifier</button><button class="danger delete-program" data-id="' + esc(p.programId) + '">Supprimer</button></div></div>'
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
    '</small></div><div class="actions"><button class="secondary edit-slot" data-id="' + row.occurrenceId + '">Modifier</button><button class="danger delete-slot" data-id="' + row.occurrenceId + '">Supprimer</button></div></div>'
  ).join('');
  document.querySelectorAll('.edit-slot').forEach(button => {
    button.addEventListener('click', () => {
      const row = rows.find(item => String(item.occurrenceId) === String(button.dataset.id));
      if (!row) return;
      document.getElementById('scheduleProgram').value = row.programId;
      document.getElementById('broadcastType').value = row.broadcastType || 'broadcast';
      document.getElementById('startAt').value = new Date(row.startAt).toISOString().slice(0,16);
      document.getElementById('endAt').value = new Date(row.endAt).toISOString().slice(0,16);
      document.getElementById('subtitle').value = row.subtitle || '';
      document.getElementById('scheduleForm').dataset.editId = row.occurrenceId;
      document.getElementById('scheduleForm').querySelector('button').textContent = 'Enregistrer la programmation';
      document.getElementById('scheduleForm').scrollIntoView({behavior:'smooth'});
    });
  });
  document.querySelectorAll('.delete-slot').forEach(button => {
    button.addEventListener('click', async () => {
      if (!confirm('Supprimer cette programmation ?')) return;
      await api('/api/admin/schedule/' + button.dataset.id, { method: 'DELETE' });
      await openChannel(selectedChannelId);
      await loadDashboard();
    });
  });
}

document.getElementById('newChannel').addEventListener('click', () => {
  editingChannelId = null;
  const f = document.getElementById('channelForm'); f.hidden = false; f.reset();
  document.getElementById('channelId').disabled = false;
  document.getElementById('channelActive').checked = true;
  document.getElementById('channelFormTitle').textContent = 'Nouvelle chaîne';
});
document.getElementById('cancelChannel').addEventListener('click', () => {
  editingChannelId = null; document.getElementById('channelForm').hidden = true;
});
document.getElementById('channelSearch').addEventListener('input', renderChannels);
document.getElementById('searchAllPrograms').addEventListener('click', searchAllPrograms);
document.getElementById('globalProgramSearch').addEventListener('keydown', e => { if(e.key==='Enter'){e.preventDefault();searchAllPrograms();} });
document.getElementById('createFeed').addEventListener('click', createFeed);
document.getElementById('groupFilter').addEventListener('change', renderChannels);
document.getElementById('channelForm').addEventListener('submit', async e => {
  e.preventDefault();
  const body = {
    id: document.getElementById('channelId').value.trim(),
    name: document.getElementById('channelName').value.trim(),
    groupName: document.getElementById('channelGroup').value.trim(),
    sortOrder: Number(document.getElementById('channelOrder').value || 0),
    logoUrl: document.getElementById('channelLogo').value.trim() || null,
    liveStreamUrl: document.getElementById('channelStream').value.trim() || null,
    description: document.getElementById('channelDescription').value.trim(),
    active: document.getElementById('channelActive').checked
  };
  try {
    await api(editingChannelId ? '/api/admin/channels/' + encodeURIComponent(editingChannelId) : '/api/admin/channels', {
      method: editingChannelId ? 'PUT' : 'POST',
      headers: {'Content-Type':'application/json'}, body: JSON.stringify(body)
    });
    editingChannelId = null; e.target.hidden = true; document.getElementById('channelId').disabled = false;
    await loadChannels();
    document.getElementById('feedChannel').innerHTML='<option value="">Aucune — flux autonome</option>'+channels.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.name)+'</option>').join('');
    await searchAllPrograms(); await loadFeeds(); await loadDashboard();
  } catch (err) { alert(err.message); }
});

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
    const editId = e.target.dataset.editId;
    const payload = {
      channelId: selectedChannelId,
      title: document.getElementById('programTitle').value.trim(),
      type: document.getElementById('programType').value,
      poster: document.getElementById('programPoster').value.trim() || null,
      playbackUrl: document.getElementById('programPlayback').value.trim() || null,
      description: document.getElementById('programDescription').value.trim()
    };
    if (editId) {
      await api('/api/admin/programs/' + encodeURIComponent(editId), {method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    } else {
      await api('/api/admin/programs', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    }
    delete e.target.dataset.editId;
    document.getElementById('programSubmit').textContent='Ajouter le programme';
    e.target.reset();
    await openChannel(selectedChannelId);
    await loadDashboard();
  } catch (e) { alert(e.message); }
});

document.getElementById('scheduleForm').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const editId = e.target.dataset.editId;
    const payload = {
      channelId: selectedChannelId,
      programId: document.getElementById('scheduleProgram').value,
      broadcastType: document.getElementById('broadcastType').value,
      startAt: new Date(document.getElementById('startAt').value).toISOString(),
      endAt: new Date(document.getElementById('endAt').value).toISOString(),
      subtitle: document.getElementById('subtitle').value.trim()
    };
    await api(editId ? '/api/admin/schedule/' + editId : '/api/admin/schedule', {
      method: editId ? 'PUT' : 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    delete e.target.dataset.editId;
    e.target.reset();
    e.target.querySelector('button').textContent = 'Programmer';
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
