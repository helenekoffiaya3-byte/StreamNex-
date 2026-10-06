(function(){
'use strict';
const tabs=document.getElementById('tabs'),list=document.getElementById('list'),count=document.getElementById('count');
let channels=[],active='__all__',favoriteOnly=false;
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function initials(v){return String(v||'Chaîne').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'TV'}
function favSet(){try{return new Set(JSON.parse(localStorage.getItem('streamlive:favorites')||'[]'))}catch(_){return new Set()}}
function toggleFav(id){const s=favSet();s.has(id)?s.delete(id):s.add(id);localStorage.setItem('streamlive:favorites',JSON.stringify([...s]));render()}
function groups(){return Array.from(new Set(channels.map(c=>c.group).filter(Boolean))).sort((a,b)=>a.localeCompare(b,'fr'))}
function renderTabs(){
 const gs=groups();tabs.innerHTML='';
 const defs=[['__all__','TOUTES LES CHAÎNES'],['__fav__','FAVORIS'],['__sport__','SPORT']];
 defs.forEach(([id,label])=>{const b=document.createElement('button');b.className='tab'+(active===id?' active':'');b.textContent=label;b.onclick=()=>{active=id;renderTabs();render()};tabs.appendChild(b)});
 gs.filter(g=>!['Sport'].includes(g)).forEach(g=>{const b=document.createElement('button');b.className='tab'+(active===g?' active':'');b.textContent=g.toUpperCase();b.onclick=()=>{active=g;renderTabs();render()};tabs.appendChild(b)});
}
function filtered(){
 const f=favSet();
 if(active==='__fav__')return channels.filter(c=>f.has(c.id));
 if(active==='__sport__')return channels.filter(c=>/sport|football/i.test((c.group||'')+' '+(c.name||'')));
 if(active==='__all__')return channels;
 return channels.filter(c=>c.group===active);
}
function card(c){
 const f=favSet(), button=document.createElement('button');button.className='channel';button.type='button';
 const logo=c.logoUrl?'<img loading="lazy" src="'+esc(c.logoUrl)+'" alt="">':'<div class="fallback">'+esc(initials(c.name))+'</div>';
 button.innerHTML='<span class="thumb">'+logo+'<button class="fav" type="button" aria-label="'+(f.has(c.id)?'Retirer des favoris':'Ajouter aux favoris')+'">'+(f.has(c.id)?'★':'☆')+'</button></span><span class="meta"><span class="name">'+esc(c.name)+'</span><span class="group">'+esc(c.group||'En direct')+'</span><span class="number">Canal '+esc(c.channelNumber)+'</span><span class="state">● DIRECT / OUVRIR LE LECTEUR</span></span>';
 const img=button.querySelector('img');if(img)img.addEventListener('error',()=>{img.replaceWith(Object.assign(document.createElement('div'),{className:'fallback',textContent:initials(c.name)}))},{once:true});
 button.querySelector('.fav').onclick=e=>{e.stopPropagation();toggleFav(c.id)};
 button.onclick=()=>{location.href='./index.html?channel='+encodeURIComponent(c.id)+'&mode=live'};
 return button;
}
function render(){
 const arr=filtered();list.innerHTML='';count.textContent=arr.length+' chaîne'+(arr.length>1?'s':'');
 if(!arr.length){list.innerHTML='<div class="empty">'+(active==='__fav__'?'Aucun favori enregistré.':'Aucune chaîne dans cette catégorie.')+'</div>';return}
 const frag=document.createDocumentFragment();arr.forEach(c=>frag.appendChild(card(c)));list.appendChild(frag)
}
function load(){
 const source=window.STREAMLIVE_CHANNELS;
 if(Array.isArray(source)){
   channels=source.filter(Boolean).map(c=>({...c,id:String(c.id||''),channelNumber:Number(c.channelNumber||0),name:String(c.name||c.id||'Chaîne'),group:String(c.group||'En direct'),logoUrl:c.logoUrl||''}));
   renderTabs();render();
 }else{
   count.textContent='Chargement du catalogue…';
 }
}
window.addEventListener('streamlive:catalog-ready',load,{once:true});
window.addEventListener('streamlive:catalog-error',()=>{count.textContent='Catalogue indisponible';list.innerHTML='<div class="empty">Impossible de charger les chaînes.</div>'},{once:true});
load();
})();