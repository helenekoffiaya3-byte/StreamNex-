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
function setActive(value){active=value;if(value!=='__all__'&&value!=='__fav__'&&value!=='__sport__'&&value!=='__sport_under__')groupFilter.value=value;else if(value==='__all__')groupFilter.value='';renderTabs();render()}
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
function makeCard(c){
 const favorites=favSet(),article=document.createElement('article');article.className='channel';article.tabIndex=0;article.setAttribute('role','link');article.setAttribute('aria-label','Ouvrir '+c.name+' dans le lecteur StreamLive');
 const src=c.logoUrl;
 const logo=src?'<img loading="lazy" decoding="async" src="'+esc(src)+'" alt="'+esc(c.name)+'">':'<div class="fallback">'+esc(initials(c.name))+'</div>';
 article.innerHTML='<div class="thumb">'+logo+'</div><div class="meta"><div class="name">'+esc(c.name)+'</div><div class="group">'+esc(groupName(c))+'</div><div class="number">Canal '+esc(c.channelNumber||'—')+'</div><div class="state '+(c.webUrl?'':'missing')+'">'+(c.webUrl?'● EN DIRECT':'SOURCE À CONFIGURER')+'</div></div><button class="fav" type="button" aria-label="'+(favorites.has(c.id)?'Retirer des favoris':'Ajouter aux favoris')+'" aria-pressed="'+favorites.has(c.id)+'">'+(favorites.has(c.id)?'★':'♡')+'</button>';
 const img=article.querySelector('img');if(img)img.addEventListener('error',()=>{img.replaceWith(Object.assign(document.createElement('div'),{className:'fallback',textContent:initials(c.name)}))},{once:true});
 article.querySelector('.fav').addEventListener('click',e=>{e.stopPropagation();toggleFav(c.id)});
 const open=()=>{location.href='./index.html?channel='+encodeURIComponent(c.id)+'&mode=live'};
 article.addEventListener('click',open);article.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
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