(function(){
'use strict';
const tabs=document.getElementById('tabs'),list=document.getElementById('list'),count=document.getElementById('count');
let channels=[],active='__all__';
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function initials(v){return String(v||'Chaîne').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'TV'}
function favSet(){try{return new Set(JSON.parse(localStorage.getItem('streamlive:favorites')||'[]'))}catch(_){return new Set()}}
function toggleFav(id){const s=favSet();s.has(id)?s.delete(id):s.add(id);localStorage.setItem('streamlive:favorites',JSON.stringify([...s]));render()}
function groups(){return Array.from(new Set(channels.map(c=>c.group).filter(Boolean))).sort((a,b)=>a.localeCompare(b,'fr'))}
function renderTabs(){
 const gs=groups();tabs.innerHTML='';
 [['__all__','TOUTES LES CHAÎNES'],['__fav__','FAVORIS'],['__sport__','SPORT']].forEach(([id,label])=>{const b=document.createElement('button');b.className='tab'+(active===id?' active':'');b.textContent=label;b.onclick=()=>{active=id;renderTabs();render()};tabs.appendChild(b)});
 gs.filter(g=>g!=='Sport').forEach(g=>{const b=document.createElement('button');b.className='tab'+(active===g?' active':'');b.textContent=g.toUpperCase();b.onclick=()=>{active=g;renderTabs();render()};tabs.appendChild(b)});
}
function filtered(){
 const f=favSet();
 if(active==='__fav__')return channels.filter(c=>f.has(c.id));
 if(active==='__sport__')return channels.filter(c=>/sport|football/i.test((c.group||'')+' '+(c.name||'')));
 if(active==='__all__')return channels;
 return channels.filter(c=>c.group===active);
}
function card(c){
 const f=favSet(),article=document.createElement('article');article.className='channel';article.tabIndex=0;
 const logo=c.logoUrl?'<img loading="lazy" src="'+esc(c.logoUrl)+'" alt="">':'<div class="fallback">'+esc(initials(c.name))+'</div>';
 article.innerHTML='<div class="thumb">'+logo+'<button class="fav" type="button" aria-label="'+(f.has(c.id)?'Retirer des favoris':'Ajouter aux favoris')+'">'+(f.has(c.id)?'★':'☆')+'</button></div><div class="meta"><div class="name">'+esc(c.name)+'</div><div class="group">'+esc(c.group||'En direct')+'</div><div class="number">Canal '+esc(c.channelNumber)+'</div><div class="state">● EN DIRECT</div></div>';
 const img=article.querySelector('img');if(img)img.addEventListener('error',()=>{img.replaceWith(Object.assign(document.createElement('div'),{className:'fallback',textContent:initials(c.name)}))},{once:true});
 article.querySelector('.fav').onclick=e=>{e.stopPropagation();toggleFav(c.id)};
 const open=()=>{location.href='./index.html?channel='+encodeURIComponent(c.id)+'&mode=live'};article.onclick=open;
 article.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}};return article;
}
function render(){
 const arr=filtered();list.innerHTML='';count.textContent=arr.length+' chaîne'+(arr.length>1?'s':'');
 if(!arr.length){list.innerHTML='<div class="empty">'+(active==='__fav__'?'Aucun favori enregistré.':'Aucune chaîne dans cette catégorie.')+'</div>';return}
 const frag=document.createDocumentFragment();arr.forEach(c=>frag.appendChild(card(c)));list.appendChild(frag);
}
async function load(){
 try{
  count.textContent='Chargement de toutes les chaînes…';
  const r=await fetch('/api/channels?mode=live',{headers:{accept:'application/json'},cache:'no-store'});
  if(!r.ok)throw new Error('HTTP_'+r.status);const source=await r.json();if(!Array.isArray(source))throw new Error('INVALID_CATALOGUE');
  channels=source.filter(Boolean).map(c=>({...c,id:String(c.id||''),channelNumber:Number(c.channelNumber||0),name:String(c.name||c.id||'Chaîne'),group:String(c.group||'En direct'),logoUrl:c.logoUrl||''}));
  renderTabs();render();
 }catch(_){count.textContent='Catalogue indisponible';list.innerHTML='<div class="empty">Impossible de charger toutes les chaînes.</div>'}
}
load();
})();