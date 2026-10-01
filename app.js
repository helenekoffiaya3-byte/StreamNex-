(()=>{
const state={channels:[],apps:[],sports:[],query:''};
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
  'boomerang':'boomerang','boomrang':'boomerang','canal-j':'canalj','tiji':'tiji','piwi-plus':'piwi',
  'tv5monde':'tv5monde','euronews-fr':'euronews','france-24-fr':'france24',
  'netflix':'netflix','peacock':'peacock','pluto-tv':'plutotv','tubi':'tubi','prime-video':'primevideo',
  'apple-tv-plus':'appletv','disney-plus':'disneyplus','paramount-plus':'paramountplus','max':'max',
  'spotify':'spotify','youtube':'youtube','amazon':'amazon','bbc-news':'bbc','bloomberg-tv':'bloomberg',
  'cbs-news-24-7':'cbs','cnbc':'cnbc','cnn':'cnn','cnn-international':'cnn','fox-news':'fox','fox-business':'fox',
  'msnbc':'msnbc','nbc-news-now':'nbc','sky-news':'skynews','al-jazeera':'aljazeera','dw':'dwcom',
  'discovery':'discovery','warner-tv-next':'warnerbros','hbo':'hbo','hbo-max':'max','showtime':'showtime',
  'paramount-network':'paramountplus','amc':'amc','fx':'fx','fxx':'fx','tnt':'tnt','tbs':'tbs',
  'teletoon-plus':'teletoon','toonami':'toonami','cartoonito':'cartoonnetwork','dreamworks':'dreamworks',
  'nicktoons':'nickelodeon','nickelodeon-junior':'nickelodeon','nickelodeon-teen':'nickelodeon',
  'mangas':'mangas','tiji':'tiji','gulli-africa':'gulli','trace-africa':'trace','trace-ivoire':'trace',
  'trace-gospel':'trace','mtv':'mtv','canal-j':'canalj','canal-plus-kids':'canalplus','canal-plus':'canalplus',
  'action':'canalplus','rtl-9':'rtl','m6-films':'m6','w9':'w9','tfx':'tf1','tf1-series-films':'tf1',
  'france-24':'france24','france-2':'france2','france-3':'france3','france-4':'france4','france-5':'france5',
  'arte':'arte','m6':'m6','tf1':'tf1','6ter':'m6','gulli':'gulli','boing':'boing','piwi-plus':'piwi',
  'rtI-1':'rti','rti-1':'rti','rti-2':'rti','nci':'nci','life-tv':'lifetv','la-3':'la3','a-plus-ivoire':'aplus',
  'tv5-monde':'tv5monde','tv5monde':'tv5monde'
};
function slug(id,name){
  return logoAliases[id]||String(name||id).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,'and').replace(/[^a-z0-9]+/g,'');
}
function initials(name){
  const p=String(name||'').trim().split(/\s+/).filter(Boolean);
  return (p.length===1?p[0].slice(0,3):p.slice(0,3).map(x=>x[0]).join('')).toUpperCase();
}
function svgLogo(c){
  const label=String(c.name||'STREAMLIVE').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').slice(0,28);
  const initials=esc(initials(c.name)).slice(0,8);
  const hue=(String(c.id||c.name).split('').reduce((n,ch)=>n+ch.charCodeAt(0),0)%360);
  const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 150"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="hsl('+hue+',80%,42%)"/><stop offset="1" stop-color="hsl('+(hue+55)+',85%,58%)"/></linearGradient></defs><rect width="320" height="150" rx="18" fill="url(#g)"/><circle cx="48" cy="48" r="24" fill="rgba(255,255,255,.22)"/><text x="48" y="57" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="white">'+initials+'</text><text x="160" y="105" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" font-weight="900" fill="white">'+label+'</text></svg>';
  return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
}
function logoSources(c){
  const s=slug(c.id,c.name);
  return [
    c.logoUrl||'',
    '/assets/logos/'+encodeURIComponent(c.id)+'.svg',
    '/assets/logos/'+encodeURIComponent(c.id)+'.png',
    'https://cdn.simpleicons.org/'+encodeURIComponent(s),
    svgLogo(c)
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
function sportsCard(s){
  const q=String(s.title||'').toLowerCase();
  const srcs=['/assets/sports/'+encodeURIComponent(s.logo||''),'/assets/logos/'+encodeURIComponent(s.logo||'')];
  const initials=(String(s.title||'SPORT').split(/\\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('')).toUpperCase();
  return '<div class="channel-card sports-card"><div class="logo-box"><div class="logo-fallback">'+esc(initials)+'</div><img alt="Logo '+esc(s.title)+'" loading="lazy" src="'+esc(srcs[0])+'" data-sources="'+esc(JSON.stringify(srcs.slice(1)))+'" onerror="logoError(this)"></div><div class="card-title">'+esc(s.title)+'</div><div class="card-meta">'+esc(s.category)+'</div></div>';
}
function section(title,list,extra=''){
  if(!list.length)return '';
  return '<section class="catalog-section '+extra+'"><div class="section-title-row"><h2>'+esc(title)+'</h2><span>'+list.length+'</span></div><div class="channels-grid">'+list.map(card).join('')+'</div></section>';
}
function render(){
  const q=state.query.trim().toLowerCase();
  const all=state.channels.filter(c=>(c.name+' '+(c.group||'')).toLowerCase().includes(q));
  const orderedGroups=['National','France','Information','Sport','Films & Cinéma','Séries','S+ StreamLive','Jeunesse','International','Documentaires','Musique','Afrique / International','Biblique','Cuisine & Lifestyle','Nollywood','Bollywood'];
  let html='';
  for(const g of orderedGroups){
    html+=section(g,all.filter(c=>c.group===g));
  }
  const remaining=all.filter(c=>!orderedGroups.includes(c.group));
  if(remaining.length)html+=section('Autres chaînes',remaining);
  const apps=state.apps.filter(a=>(a.name+' '+(a.group||'')).toLowerCase().includes(q));
  if(apps.length)html+=section('Apps & archives',apps,'apps-section');
  const sports=state.sports.filter(s=>(s.title+' '+s.category).toLowerCase().includes(q));
  if(sports.length)html+='<section class="catalog-section sports-section"><div class="section-title-row"><h2>Sports & compétitions</h2><span>'+sports.length+'</span></div><div class="channels-grid">'+sports.map(sportsCard).join('')+'</div></section>';
  $('#catalog').innerHTML=html||'<div class="empty">Aucune chaîne ou app trouvée.</div>';
  $('#catalog-status').textContent=state.query?all.length+' chaîne(s) · '+sports.length+' sport(s) trouvé(s)':state.channels.length+' chaînes · '+state.apps.length+' apps/archives · '+state.sports.length+' compétitions';
}
async function init(){
  const [cr,ar,sr]=await Promise.all([fetch('/api/stream/channels'),fetch('/api/apps'),fetch('/api/sports')]);
  const cd=await cr.json(),ad=await ar.json(),sd=await sr.json();
  if(!cr.ok||!cd.success)throw Error(cd.error||'Catalogue indisponible');
  state.channels=cd.channels||[];
  state.apps=ad.success?(ad.apps||[]):[];
  state.sports=sr.ok&&sd.success?(sd.sports||[]):[];
  render();
}
$('#search')?.addEventListener('input',e=>{state.query=e.target.value;render()});
init().catch(e=>{$('#catalog-status').textContent=e.message});
})();