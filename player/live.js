(function(){
'use strict';
const tabs=document.getElementById('tabs');
const list=document.getElementById('list');
const count=document.getElementById('count');
const totalCount=document.getElementById('total-count');
const search=document.getElementById('live-search');
const groupFilter=document.getElementById('group-filter');
const sportUnder=document.getElementById('sport-under-panel');
const sideGroups=document.getElementById('side-groups');
const sideTotal=document.getElementById('side-total');
const sideFavCount=document.getElementById('side-fav-count');
let channels=[];
let active='__all__';
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function initials(v){return String(v||'TV').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'TV'}
function favSet(){try{const x=JSON.parse(localStorage.getItem('streamlive:favorites')||'[]');return new Set(Array.isArray(x)?x.map(String):[])}catch(_){return new Set()}}
function toggleFav(id){try{const s=favSet();s.has(String(id))?s.delete(String(id)):s.add(String(id));localStorage.setItem('streamlive:favorites',JSON.stringify([...s]));render()}catch(_){count.textContent='Impossible de modifier les favoris sur ce navigateur.'}}
function groupName(c){return String(c.group||'Autres chaînes').trim()||'Autres chaînes'}
function sorted(arr){return arr.slice().sort((a,b)=>(a.channelNumber||99999)-(b.channelNumber||99999)||a.name.localeCompare(b.name,'fr'))}
function populateFilter(){
 const groups=[...new Set(channels.map(groupName))].sort((a,b)=>a.localeCompare(b,'fr'));
 const current=groupFilter.value;
 groupFilter.innerHTML='<option value="">Toutes les catégories</option>'+groups.map(g=>'<option value="'+esc(g)+'">'+esc(g)+'</option>').join('');
 if(groups.includes(current))groupFilter.value=current;
}
function setActive(value){active=value;if(value!=='__all__'&&value!=='__fav__'&&value!=='__sport__'&&value!=='__sport_under__')groupFilter.value=value;else groupFilter.value='';renderTabs();render()}
function renderTabs(){
 const groups=[...new Set(channels.map(groupName))].sort((a,b)=>a.localeCompare(b,'fr'));
 const items=[['__all__','Toutes'],['__fav__','♡ Favoris'],['__sport__','Sport'],['__sport_under__','Sport Under']];
 groups.forEach(g=>items.push([g,g]));
 tabs.innerHTML='';
 items.forEach(([value,label])=>{const b=document.createElement('button');b.type='button';b.className='tab'+(active===value?' active':'');b.textContent=label;b.setAttribute('aria-pressed',String(active===value));b.addEventListener('click',()=>setActive(value));tabs.appendChild(b)});
}
function renderSidebar(){
 if(!sideGroups)return;
 const fav=favSet(),groups=[...new Set(channels.map(groupName))].sort((a,b)=>a.localeCompare(b,'fr'));
 sideTotal.textContent=String(channels.length);sideFavCount.textContent=String(fav.size);
 const items=[['__all__','▣','Toutes les chaînes',channels.length],['__fav__','♡','Favoris',fav.size]];
 groups.forEach(g=>items.push([g,'▤',g,channels.filter(c=>groupName(c)===g).length]));
 sideGroups.innerHTML=items.map(([value,icon,label,n])=>'<button type="button" class="side-item'+(active===value?' active':'')+'" data-filter="'+esc(value)+'"><span><span class="side-icon">'+icon+'</span> '+esc(label)+'</span><small>'+n+'</small></button>').join('');
 sideGroups.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setActive(b.dataset.filter)));
}
function filtered(){
 const fav=favSet(),term=String(search.value||'').trim().toLocaleLowerCase('fr');
 let arr=channels;
 if(active==='__fav__')arr=arr.filter(c=>fav.has(c.id));
 else if(active==='__sport__')arr=arr.filter(c=>/sport|football|rugby|basket|tennis|motorsport/i.test(c.group+' '+c.name));
 else if(active!=='__all__'&&active!=='__sport_under__')arr=arr.filter(c=>groupName(c)===active);
 const selectedGroup=groupFilter.value;
 if(selectedGroup)arr=arr.filter(c=>groupName(c)===selectedGroup);
 if(term)arr=arr.filter(c=>(c.name+' '+c.id+' '+c.channelNumber+' '+c.group).toLocaleLowerCase('fr').includes(term));
 return sorted(arr);
}
let selectedChannelId=null;
let currentHls=null;
let sourceLoadTimer=null;
function stopCurrentMedia(){
 if(sourceLoadTimer){clearTimeout(sourceLoadTimer);sourceLoadTimer=null}
 if(currentHls){try{currentHls.destroy()}catch(_){}currentHls=null}
 const stage=document.getElementById('live-player-stage');
 if(!stage)return;
 stage.querySelectorAll('video').forEach(v=>{try{v.pause();v.removeAttribute('src');v.load()}catch(_){}});
 stage.innerHTML='';
}
function showPlayerMessage(title,message,channel){
 const stage=document.getElementById('live-player-stage');
 stage.innerHTML='<div class="player-source-error"><strong>'+esc(title)+'</strong><p>'+esc(message)+'</p>'+(channel&&channel.webUrl?'<a href="'+esc(channel.webUrl)+'" target="_blank" rel="noopener noreferrer">Ouvrir le direct officiel ↗</a>':'')+'</div>';
}
function selectChannel(c){
 selectedChannelId=c.id;
 const title=document.getElementById('selected-channel-title');
 const desc=document.getElementById('selected-channel-description');
 const number=document.getElementById('selected-channel-number');
 const status=document.getElementById('player-source-status');
 const open=document.getElementById('open-official-live');
 title.textContent=c.name;
 desc.textContent=c.group+' · sélectionnez le bouton officiel si le diffuseur bloque la lecture intégrée.';
 number.textContent='Canal '+(c.channelNumber||'—');
 open.hidden=!c.webUrl;
 open.href=c.webUrl||'#';
 stopCurrentMedia();
 if(!c.webUrl){
  status.textContent='Source officielle manquante';
  showPlayerMessage('Direct non configuré','Aucun lien officiel n’est enregistré pour cette chaîne. Le lien ne sera pas inventé.',c);
  render();
  document.getElementById('live-player-stage').scrollIntoView({behavior:'smooth',block:'center'});
  return;
 }
 status.textContent='Chargement du direct officiel…';
 const stage=document.getElementById('live-player-stage');
 const url=String(c.webUrl);
 if(/\.m3u8(?:$|[?#])/i.test(url)||/\.mpd(?:$|[?#])/i.test(url)){
  const video=document.createElement('video');
  video.controls=true;video.autoplay=true;video.playsInline=true;video.setAttribute('aria-label','Direct de '+c.name);
  stage.appendChild(video);
  if(/\.m3u8(?:$|[?#])/i.test(url)&&video.canPlayType('application/vnd.apple.mpegurl')){
   video.src=url;video.play().catch(()=>{});status.textContent='Flux HLS — lecture native';
  }else if(/\.m3u8(?:$|[?#])/i.test(url)){
   const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js';
   script.onload=()=>{if(window.Hls&&window.Hls.isSupported()){currentHls=new window.Hls({enableWorker:true,lowLatencyMode:true});currentHls.loadSource(url);currentHls.attachMedia(video);currentHls.on(window.Hls.Events.MANIFEST_PARSED,()=>{video.play().catch(()=>{});status.textContent='Flux HLS prêt'});currentHls.on(window.Hls.Events.ERROR,(_,data)=>{if(data.fatal){status.textContent='Erreur du flux';showPlayerMessage('Flux indisponible','Le lecteur n’a pas pu lire ce flux. Vérifiez la source officielle.',c)}})}else{showPlayerMessage('Format non pris en charge','Ce navigateur ne peut pas lire ce flux directement. Ouvrez le site officiel.',c)}};
   script.onerror=()=>showPlayerMessage('Lecteur HLS indisponible','Le lecteur de flux n’a pas pu être chargé. Ouvrez le site officiel.',c);document.head.appendChild(script);
  }else{video.src=url;video.play().catch(()=>{});status.textContent='Flux vidéo — lecture en cours'}
  video.addEventListener('error',()=>{status.textContent='Flux non lisible';showPlayerMessage('Impossible de lire ce flux','La source peut être hors ligne, protégée ou incompatible avec ce navigateur.',c)},{once:true});
 }else{
  const frame=document.createElement('iframe');
  frame.title='Direct officiel de '+c.name;frame.src=url;frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
  stage.appendChild(frame);
  status.textContent='Page officielle chargée si le diffuseur autorise l’intégration';
  sourceLoadTimer=setTimeout(()=>{if(selectedChannelId===c.id){status.textContent='Si la vidéo ne démarre pas, ouvrez le site officiel';}},5000);
 }
 render();
 document.getElementById('live-player-stage').scrollIntoView({behavior:'smooth',block:'center'});
}
function makeCard(c){
 const favorites=favSet(),article=document.createElement('article');article.className='channel channel-with-player';article.tabIndex=0;article.setAttribute('role','button');article.setAttribute('aria-pressed',String(c.id===selectedChannelId));article.setAttribute('aria-label','Lire le direct de '+c.name);
 const configured=Boolean(c.webUrl);
 const logo=c.logoUrl?'<img loading="lazy" decoding="async" src="'+esc(c.logoUrl)+'" alt="'+esc(c.name)+'">':'<div class="fallback">'+esc(initials(c.name))+'</div>';
 article.innerHTML='<div class="channel-card-info"><div class="channel-logo">'+logo+'</div><div class="meta"><div class="name">'+esc(c.name)+'</div><div class="group">'+esc(groupName(c))+'</div><div class="number">Canal '+esc(c.channelNumber||'—')+'</div><div class="state '+(configured?'':'missing')+'">'+(configured?'● LIEN OFFICIEL':'SOURCE À CONFIGURER')+'</div></div><button class="fav" type="button" aria-label="'+(favorites.has(c.id)?'Retirer des favoris':'Ajouter aux favoris')+'" aria-pressed="'+favorites.has(c.id)+'">'+(favorites.has(c.id)?'★':'♡')+'</button></div>';
 const img=article.querySelector('.channel-logo img');if(img)img.addEventListener('error',()=>{img.replaceWith(Object.assign(document.createElement('div'),{className:'fallback',textContent:initials(c.name)}))},{once:true});
 article.addEventListener('click',e=>{if(e.target.closest('.fav'))return;selectChannel(c)});
 article.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target===article){e.preventDefault();selectChannel(c)}});
 article.querySelector('.fav').addEventListener('click',e=>{e.stopPropagation();toggleFav(c.id)});
 return article;
}
function render(){
 renderSidebar();
 const under=active==='__sport_under__';sportUnder.classList.toggle('hidden',!under);list.classList.toggle('hidden',under);
 if(under){count.textContent='SPORT UNDER · SCORES EN DIRECT';list.innerHTML='';return}
 const arr=filtered();list.innerHTML='';
 count.innerHTML='<strong>'+arr.length+'</strong> chaîne'+(arr.length>1?'s':'')+' affichée'+(arr.length>1?'s':'')+(search.value.trim()||groupFilter.value?' sur '+channels.length:' au total');
 if(!arr.length){list.innerHTML='<div class="empty">'+(active==='__fav__'?'Aucun favori enregistré pour le moment.':'Aucune chaîne ne correspond à ces filtres.')+'</div>';return}
 const fragment=document.createDocumentFragment();arr.forEach(c=>fragment.appendChild(makeCard(c)));list.appendChild(fragment);
}
async function load(){
 try{
  count.textContent='Chargement de toutes les chaînes…';
  const response=await fetch('/api/channels?mode=live',{headers:{accept:'application/json'},cache:'no-store'});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const source=await response.json();if(!Array.isArray(source))throw new Error('INVALID_CATALOGUE');
  // Preserve every catalogue entry, including channels whose live source is not configured.
  channels=source.filter(Boolean).map(c=>({id:String(c.id||c.tvgId||''),channelNumber:Number(c.channelNumber)||0,name:String(c.name||c.id||'Chaîne'),group:String(c.group||'Autres chaînes'),logoUrl:String(c.logoUrl||''),webUrl:c.webUrl||null})).filter(c=>c.id);
  totalCount.textContent=channels.length;
  populateFilter();renderTabs();render();
 }catch(_){totalCount.textContent='—';count.textContent='Catalogue indisponible';list.innerHTML='<div class="empty">Impossible de charger le catalogue. Vérifiez la connexion puis réessayez.</div>'}
}
search.addEventListener('input',render);
groupFilter.addEventListener('change',()=>{active=groupFilter.value||'__all__';renderTabs();render()});
const favoritesLink=document.getElementById('favorites-link');if(favoritesLink)favoritesLink.addEventListener('click',e=>{e.preventDefault();setActive('__fav__')});
load();
})();