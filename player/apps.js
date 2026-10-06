(function(){
'use strict';
const content=document.getElementById('content');
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function slug(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function logo(c){
 if(c.logoUrl)return c.logoUrl;
 if(/^s\+/i.test(c.name)||/^s\+/i.test(c.group))return './assets/logos/s-plus.svg';
 return '';
}
function sectionTitle(g){if(/^s\+/i.test(g))return 'Les chaînes S+';if(/ivoire|côte d.?ivoire|national/i.test(g))return 'Les chaînes Ivoiriennes';return g||'Toutes les chaînes'}
function render(channels){
 const groups=new Map();
 channels.slice().sort((a,b)=>Number(a.channelNumber)-Number(b.channelNumber)).forEach(c=>{
   const g=/^s\+/i.test(c.name)?'S+':(c.group||'Toutes les chaînes');
   if(!groups.has(g))groups.set(g,[]);groups.get(g).push(c);
 });
 const splus=groups.get('S+');const ordered=[];
 if(splus){ordered.push(['S+',splus]);groups.delete('S+')}
 const ivoire=[...groups].filter(([g])=>/ivoire|côte d.?ivoire|national/i.test(g));
 ivoire.forEach(x=>{ordered.push(x);groups.delete(x[0])});
 const rest=[...groups.entries()];
 if(rest.length)ordered.push(...rest);
 content.innerHTML='';
 for(const [group,list] of ordered){
   const section=document.createElement('section');section.className='section';
   section.innerHTML='<h2>'+esc(sectionTitle(group))+'</h2><div class="grid"></div>';
   const grid=section.querySelector('.grid');
   list.forEach(c=>{
     const card=document.createElement('article');card.className='card';card.tabIndex=0;
     const src=logo(c);
     card.innerHTML=(src?'<img class="logo" loading="lazy" src="'+esc(src)+'" alt="'+esc(c.name)+'">':'<div class="logo" style="display:grid;place-items:center;font-size:24px;font-weight:900">'+esc(String(c.name).slice(0,3).toUpperCase())+'</div>')+
       '<div class="name">'+esc(c.name)+'</div><div class="num">Canal '+esc(c.channelNumber)+'</div>';
     card.onclick=()=>location.href='./index.html?channel='+encodeURIComponent(c.id)+'&mode=live';
     card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click()}};
     grid.appendChild(card);
   });
   content.appendChild(section);
 }
}
async function load(){
 try{
   const r=await fetch('/api/channels?mode=live',{headers:{accept:'application/json'},cache:'no-store'});
   if(!r.ok)throw new Error();
   const data=await r.json();if(!Array.isArray(data))throw new Error();
   render(data);
 }catch(_){content.innerHTML='<div class="empty">Impossible de charger le catalogue des chaînes.</div>'}
}
load();
})();