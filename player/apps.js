(function(){
'use strict';
const content=document.getElementById('content');
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function logo(c){if(c.logoUrl)return c.logoUrl;if(/^s\+/i.test(c.name)||/^s\+/i.test(c.group))return './assets/logos/s-plus.svg';return ''}
function sectionTitle(g){if(/^s\+/i.test(g))return 'Les chaînes S+';if(/ivoire|côte d.?ivoire|national/i.test(g))return 'Les chaînes Ivoiriennes';return g||'Toutes les chaînes'}
function render(channels){
 const groups=new Map();
 channels.slice().sort((a,b)=>Number(a.channelNumber)-Number(b.channelNumber)).forEach(c=>{
  const g=/^s\+/i.test(c.name)?'S+':(c.group||'Toutes les chaînes');if(!groups.has(g))groups.set(g,[]);groups.get(g).push(c);
 });
 const ordered=[];const splus=groups.get('S+');if(splus){ordered.push(['S+',splus]);groups.delete('S+')}
 for(const x of [...groups].filter(([g])=>/ivoire|côte d.?ivoire|national/i.test(g))){ordered.push(x);groups.delete(x[0])}
 ordered.push(...groups.entries());content.innerHTML='';
 for(const [group,list] of ordered){
  const section=document.createElement('section');section.className='section';
  section.innerHTML='<h2>'+esc(sectionTitle(group))+'</h2><div class="grid"></div>';
  const grid=section.querySelector('.grid');
  list.forEach(c=>{
   const card=document.createElement('article');card.className='card';card.tabIndex=0;
   const src=logo(c);
   card.innerHTML=(src?'<img class="logo" loading="lazy" src="'+esc(src)+'" alt="'+esc(c.name)+'">':'<div class="logo fallback">'+esc(String(c.name).slice(0,3).toUpperCase())+'</div>')+
   '<div class="name">'+esc(c.name)+'</div><div class="num">Canal '+esc(c.channelNumber)+'</div><div class="replay">REPLAY</div>';
   const open=()=>location.href='./replay.html?channel='+encodeURIComponent(c.id);
   card.onclick=open;card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}};
   grid.appendChild(card);
  });
  content.appendChild(section);
 }
}
async function load(){
 try{const r=await fetch('/api/channels',{headers:{accept:'application/json'},cache:'no-store'});if(!r.ok)throw new Error();const data=await r.json();if(!Array.isArray(data))throw new Error();render(data)}
 catch(_){content.innerHTML='<div class="empty">Impossible de charger le catalogue des chaînes.</div>'}
}
load();
})();