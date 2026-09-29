(()=>{
const state={channels:[],apps:[],query:''};
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const logoAliases={
  'rti-1':'rti','rti-2':'rti','la-3':'la3','a-plus-ivoire':'a-plus',
  'life-tv':'life-tv','nci':'nci','canal-plus':'canalplus',
  'canal-plus-cote-divoire':'canalplus','canal-plus-premiere':'canalplus',
  'canal-plus-action':'canalplus','canal-plus-cinema':'canalplus',
  'canal-plus-family':'canalplus','canal-plus-sport':'canalplus',
  'canal-plus-docs':'canalplus','canal-plus-kids':'canalplus',
  'france-2':'france2','france-3':'france3','france-4':'france4','france-5':'france5',
  'm6':'m6','tf1':'tf1','arte':'arte','disney-channel':'disneychannel',
  'disney-junior':'disneyjunior','cartoon-network':'cartoonnetwork',
  'nickelodeon':'nickelodeon','gulli':'gulli','boing':'boing',
  'boomrang':'boomerang','canal-j':'canalj','tiji':'tiji','piwi-plus':'piwi',
  'tv5monde':'tv5monde','euronews-fr':'euronews','france-24-fr':'france24'
};
function slug(id,name){
  return logoAliases[id]||String(name||id).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,'and').replace(/[^a-z0-9]+/g,'');
}
function initials(name){
  const p=String(name||'').trim().split(/\s+/).filter(Boolean);
  return (p.length===1?p[0].slice(0,3):p.slice(0,3).map(x=>x[0]).join('')).toUpperCase();
}
function logoSources(c){
  const s=slug(c.id,c.name);
  return [
    c.logoUrl||'',
    '/assets/logos/'+encodeURIComponent(c.id)+'.png',
    'https://cdn.simpleicons.org/'+encodeURIComponent(s)
  ].filter(Boolean);
}
function logoHtml(c){
  const srcs=logoSources(c);
  return '<div class="logo-box"><div class="logo-fallback">'+esc(initials(c.name))+'</div><img alt="" loading="lazy" src="'+esc(srcs[0])+'" data-sources="'+esc(JSON.stringify(srcs.slice(1)))+'" onerror="logoError(this)"></div>';
}
window.logoError=function(img){
  let list=[];
  try{list=JSON.parse(img.dataset.sources||'[]')}catch(_){}
  if(list.length){img.dataset.sources=JSON.stringify(list.slice(1));img.src=list[0];return}
  img.remove();
};
function card(c){
  const href=c.channelId?'/channel/'+encodeURIComponent(c.channelId):c.id&&c.type==='channel'?'/channel/'+encodeURIComponent(c.id):'#';
  const status=c.sourceStatus||c.status||'CATALOGUE';
  return '<a class="channel-card" href="'+href+'">'+logoHtml(c)+'<div class="card-title">'+esc(c.name)+'</div><div class="card-meta">'+esc(c.group||'App')+'<span class="dot">•</span>'+esc(status)+'</div></a>';
}
function section(title,list,extra=''){
  if(!list.length)return '';
  return '<section class="catalog-section '+extra+'"><div class="section-title-row"><h2>'+esc(title)+'</h2><span>'+list.length+'</span></div><div class="channels-grid">'+list.map(card).join('')+'</div></section>';
}
function render(){
  const q=state.query.trim().toLowerCase();
  const all=state.channels.filter(c=>(c.name+' '+(c.group||'')).toLowerCase().includes(q));
  const canal=all.filter(c=>/^canal\+/i.test(c.name)||/canal\+/i.test(c.name));
  const ivoire=all.filter(c=>c.group==='National');
  const used=new Set([...canal,...ivoire].map(c=>c.id));
  const orderedGroups=['France','Information','Sport','Films & Cinéma','Séries','Jeunesse','International','Documentaires','Musique','Afrique / International','Biblique','Cuisine & Lifestyle','Nollywood','Bollywood','S+ StreamLive'];
  let html='';
  html+=section('Les chaînes CANAL+',canal,'featured');
  html+=section('Les chaînes Ivoiriennes',ivoire,'featured');
  html+=section('Toutes les chaînes',all,'all');
  for(const g of orderedGroups){
    const list=all.filter(c=>c.group===g&&!used.has(c.id));
    if(list.length)html+=section(g,list);
  }
  const remaining=all.filter(c=>!used.has(c.id)&&!orderedGroups.includes(c.group));
  if(remaining.length)html+=section('Autres chaînes',remaining);
  const apps=state.apps.filter(a=>(a.name+' '+(a.group||'')).toLowerCase().includes(q));
  html+=section('Apps & archives',apps,'apps-section');
  $('#catalog').innerHTML=html||'<div class="empty">Aucune chaîne ou app trouvée.</div>';
  $('#catalog-status').textContent=state.query?all.length+' chaîne(s) trouvée(s)':state.channels.length+' chaînes · '+state.apps.length+' apps/archives';
}
async function init(){
  const [cr,ar]=await Promise.all([fetch('/api/stream/channels'),fetch('/api/apps')]);
  const cd=await cr.json(),ad=await ar.json();
  if(!cr.ok||!cd.success)throw Error(cd.error||'Catalogue indisponible');
  state.channels=cd.channels||[];
  state.apps=ad.success?(ad.apps||[]):[];
  render();
}
$('#search')?.addEventListener('input',e=>{state.query=e.target.value;render()});
init().catch(e=>{$('#catalog-status').textContent=e.message});
})();