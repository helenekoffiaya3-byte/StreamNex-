(() => {
'use strict';
const state={channels:[],live:[],replays:[],activeCategory:'all',query:''};
let player=null;
const labels={all:'Toutes',National:'🇨🇮 National',Info:'📰 Information',Jeunesse:'🎈 Jeunesse',Films:'🎬 Films & Séries',Biblical:'✝️ Biblical'};
const $=id=>document.getElementById(id);

function initPlayer(){
 if(player)return player;
 player=new StreamLivePlayer({videoId:'streamVideo',modalId:'modal',titleId:'playerTitle',statusId:'playerStatus',noteId:'playerNote',emptyId:'playerEmpty'});
 window.streamLivePlayer=player;
 return player;
}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function time(v){if(!v)return '';const d=new Date(v);return Number.isNaN(d.getTime())?'':d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});}
function meta(x){const t=[time(x.startAt),time(x.endAt)].filter(Boolean).join(' - ');const e=x.seasonNumber!=null&&x.episodeNumber!=null?'S'+x.seasonNumber+' E'+x.episodeNumber:'';return [t,e].filter(Boolean).join(' • ');}
function card(x){
 const poster=x.poster?'<img src="'+esc(x.poster)+'" alt="" loading="lazy">':'<div class="poster-fallback">'+esc((x.title||'?').slice(0,1).toUpperCase())+'</div>';
 return '<article class="program-card" tabindex="0" role="button" data-channel-id="'+esc(x.channelId)+'" data-occurrence-id="'+esc(x.occurrenceId)+'"><div class="program-poster">'+poster+'<span class="program-tag">'+(x.mode==='LIVE'?'DIRECT':'VOD')+'</span></div><div class="program-card-body"><strong>'+esc(x.title||x.channelName)+'</strong><span>'+esc(x.channelName)+(meta(x)?' • '+esc(meta(x)):'')+'</span></div></article>';
}
function bind(root){
 root.querySelectorAll('.program-card').forEach(el=>{
  const open=()=>{const x=state.live.concat(state.replays).find(i=>String(i.channelId)===el.dataset.channelId&&String(i.occurrenceId)===el.dataset.occurrenceId);if(x)initPlayer().selectProgram(x.channelId,x.occurrenceId,x.title||x.channelName,x.mode+' • '+x.channelName,x.poster||null);};
  el.onclick=open;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}};
 });
}
function renderEpg(){
 const live=$('liveRow'),rep=$('replayRow');
 live.innerHTML=state.live.length?state.live.map(card).join(''):'<div class="empty">Aucun direct avec une source vidéo réelle disponible.</div>';
 rep.innerHTML=state.replays.length?state.replays.map(card).join(''):'<div class="empty">Aucun replay avec une source vidéo réelle disponible.</div>';
 bind(live);bind(rep);
}
function logo(c){
 const initials=esc((c.name||'?').split(/\s+/).map(x=>x[0]).join('').slice(0,3).toUpperCase());
 return c.logoUrl?'<span class="wm-fallback">'+initials+'</span><img class="real-logo" alt="'+esc(c.name)+' — logo" loading="lazy" src="'+esc(c.logoUrl)+'" onload="this.parentElement.classList.add(\'has-img\')" onerror="this.remove()">':'<span class="wm-fallback">'+initials+'</span>';
}
function renderChannels(){
 const chips=$('channelChips'),fav=$('favGrid'),all=$('allGrid'),q=state.query.toLowerCase();
 const filtered=state.channels.filter(c=>(state.activeCategory==='all'||c.group===state.activeCategory)&&(!q||(c.name+' '+c.group).toLowerCase().includes(q)));
 chips.innerHTML=Object.entries(labels).map(([id,label])=>'<button type="button" class="category-chip'+(state.activeCategory===id?' active':'')+'" data-category="'+esc(id)+'">'+esc(label)+'</button>').join('');
 chips.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.activeCategory=b.dataset.category;renderChannels();});
 fav.innerHTML='<div class="empty">Aucun favori enregistré.</div>';all.innerHTML='';
 ['National','Info','Jeunesse','Films','Biblical'].forEach(group=>{
  const list=filtered.filter(c=>c.group===group);if(!list.length)return;
  const title=document.createElement('h3');title.className='category-label';title.textContent=labels[group]||group;all.appendChild(title);
  const grid=document.createElement('div');grid.className='logo-grid';
  list.forEach(c=>{const el=document.createElement('article');el.className='logo-tile';el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('aria-label','Ouvrir '+c.name);el.innerHTML=logo(c);el.onclick=()=>playChannelById(c.id);el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();playChannelById(c.id);}};grid.appendChild(el);});
  all.appendChild(grid);
 });
 if(!filtered.length)all.innerHTML='<div class="empty">Aucune chaîne trouvée.</div>';
}
async function loadChannels(){
 const r=await fetch('/api/stream/channels',{headers:{Accept:'application/json'}}),d=await r.json();
 if(!r.ok||!d.success)throw new Error(d.error||'Catalogue indisponible.');
 state.channels=Array.isArray(d.channels)?d.channels:[];renderChannels();
}
async function loadEpg(){
 const r=await fetch('/api/epg/vitrine',{headers:{Accept:'application/json'}}),d=await r.json();
 if(!r.ok||!d.success)throw new Error(d.error||'EPG indisponible.');
 state.live=Array.isArray(d.live)?d.live:[];state.replays=Array.isArray(d.replays)?d.replays:[];renderEpg();
}
async function playChannelById(channelId){
 try{
  const r=await fetch('/api/channels/'+encodeURIComponent(channelId)+'/programs',{headers:{Accept:'application/json'}}),d=await r.json();
  if(!r.ok||!d.success)throw new Error(d.error||'Programme TV indisponible.');
  const now=Date.now(),o=(d.occurrences||[]).find(x=>{const s=Date.parse(x.startAt),e=x.endAt?Date.parse(x.endAt):NaN;return Number.isFinite(s)&&s<=now&&(Number.isNaN(e)||now<e);});
  const c=state.channels.find(x=>x.id===channelId);
  initPlayer().selectProgram(channelId,o?.occurrenceId,o?.title||o?.subtitle||c?.name||'Programme',o?meta(o):'Aucun programme EPG en cours',o?.poster||null);
 }catch(e){initPlayer().showError(e.message||'Programme TV indisponible.');}
}
function closePlayer(){initPlayer().close();}
$('search').addEventListener('input',e=>{state.query=e.target.value||'';renderChannels();});
$('searchBtn').onclick=renderChannels;
$('directBtn').onclick=()=>{const x=state.live[0];if(x)initPlayer().selectProgram(x.channelId,x.occurrenceId,x.title||x.channelName,'LIVE • '+x.channelName,x.poster||null);else initPlayer().showError('Aucun direct disponible.');};
$('heroDirectBtn')?.addEventListener('click',()=>$('directBtn').click());
$('modal').addEventListener('click',e=>{if(e.target.id==='modal')closePlayer();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePlayer();});
window.playChannelById=playChannelById;window.closePlayer=closePlayer;initPlayer();
Promise.all([loadChannels(),loadEpg()]).catch(e=>{console.error('[StreamLive]',e);$('liveRow').innerHTML='<div class="empty">EPG indisponible pour le moment.</div>';$('replayRow').innerHTML='<div class="empty">EPG indisponible pour le moment.</div>';});
})();