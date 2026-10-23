(function(){
'use strict';
const content=document.getElementById('content');
const search=document.getElementById('channel-search');
const filter=document.getElementById('category-filter');
const totalCount=document.getElementById('total-count');
const resultCount=document.getElementById('result-count');
let allChannels=[];
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function logo(c){if(c.logoUrl)return c.logoUrl;if(/^s\+/i.test(c.name)||/^s\+/i.test(c.group))return './assets/logos/s-plus.svg';return ''}
function getGroup(c){return /^s\+/i.test(c.name)?'S+':(String(c.group||'').trim()||'Autres chaînes')}
function sorted(list){return list.slice().sort((a,b)=>(Number(a.channelNumber)||99999)-(Number(b.channelNumber)||99999)||String(a.name).localeCompare(String(b.name),'fr'))}
function setupCategories(channels){
 const groups=[...new Set(channels.map(getGroup))].sort((a,b)=>a.localeCompare(b,'fr'));
 filter.innerHTML='<option value="">Toutes les catégories</option>'+groups.map(g=>'<option value="'+esc(g)+'">'+esc(g)+'</option>').join('');
}
function makeCard(c){
 const card=document.createElement('article');card.className='card';card.tabIndex=0;card.setAttribute('role','link');card.setAttribute('aria-label','Ouvrir le Replay de '+c.name);
 const src=logo(c);
 card.innerHTML=(src?'<img class="logo" loading="lazy" decoding="async" src="'+esc(src)+'" alt="'+esc(c.name)+'" onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'logo fallback\',textContent:'+JSON.stringify(String(c.name||'TV').slice(0,3).toUpperCase())+'}))">':'<div class="logo fallback">'+esc(String(c.name||'TV').slice(0,3).toUpperCase())+'</div>')+
 '<div class="name">'+esc(c.name||'Chaîne sans nom')+'</div><div class="num">Canal '+esc(c.channelNumber??'—')+'</div><span class="replay">OUVRIR LE REPLAY</span>';
 const open=()=>{if(c.id)location.href='./replay.html?channel='+encodeURIComponent(c.id)};
 card.addEventListener('click',open);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
 return card;
}
function render(){
 const term=String(search.value||'').trim().toLocaleLowerCase('fr');
 const category=filter.value;
 const filtered=sorted(allChannels.filter(c=>(!term||String(c.name||'').toLocaleLowerCase('fr').includes(term)||String(c.group||'').toLocaleLowerCase('fr').includes(term)||String(c.channelNumber||'').includes(term))&&(!category||getGroup(c)===category)));
 content.innerHTML='';
 resultCount.innerHTML='<strong>'+filtered.length+'</strong> chaîne'+(filtered.length>1?'s':'')+' affichée'+(filtered.length>1?'s':'')+(term||category?' sur '+allChannels.length:' au total');
 if(!filtered.length){content.innerHTML='<div class="empty">Aucune chaîne ne correspond à votre recherche.</div>';return}
 const groups=new Map();
 filtered.forEach(c=>{const g=getGroup(c);if(!groups.has(g))groups.set(g,[]);groups.get(g).push(c)});
 const ordered=[...groups.entries()].sort((a,b)=>{
  const priority=entry=>entry[0]==='S+'?0:/ivoire|côte d.?ivoire|national/i.test(entry[0])?1:2;
  return priority(a)-priority(b)||a[0].localeCompare(b[0],'fr');
 });
 for(const [group,list] of ordered){
  const section=document.createElement('section');section.className='section';
  const heading=document.createElement('div');heading.className='section-head';
  const title=document.createElement('h2');title.textContent=group==='S+'?'Les chaînes S+':group;
  const count=document.createElement('span');count.className='section-count';count.textContent=list.length+' chaîne'+(list.length>1?'s':'');
  heading.append(title,count);section.appendChild(heading);
  const grid=document.createElement('div');grid.className='grid';
  const fragment=document.createDocumentFragment();list.forEach(c=>fragment.appendChild(makeCard(c)));grid.appendChild(fragment);section.appendChild(grid);content.appendChild(section);
 }
}
async function load(){
 try{
  const response=await fetch('/api/channels',{headers:{accept:'application/json'},cache:'no-store'});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const data=await response.json();if(!Array.isArray(data))throw new Error('Format de catalogue inattendu');
  // The API's default mode returns every catalogue channel except channels marked liveOnly.
  // Do not cap the array or use a nested fixed-height scrolling container.
  allChannels=data.filter(c=>c&& !c.liveOnly);
  totalCount.textContent=allChannels.length;
  setupCategories(allChannels);render();
 }catch(error){
  content.innerHTML='<div class="empty error">Impossible de charger le catalogue. Réessayez lorsque la connexion sera rétablie.</div>';
  resultCount.textContent='Catalogue indisponible';
 }
}
search.addEventListener('input',render);filter.addEventListener('change',render);load();
})();