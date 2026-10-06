/* StreamLive — espace utilisateur privé : recherche de programmes */
(function(){
'use strict';
const seed=[
{id:'cacao',name:'Cacao',genre:'Séries',provider:'S+',available:true,poster:'',keywords:['serie','drame','afrique']},
{id:'karate-kid-legends',name:'Karate Kid Legends',genre:'Cinéma',provider:'S+',available:true,poster:'',keywords:['cinema','action','arts martiaux']},
{id:'invisible',name:'Invisible',genre:'Séries',provider:'S+',available:true,poster:'',keywords:['serie','drame','afrique']},
{id:'amour-profond',name:'Amour profond',genre:'Séries',provider:'Novelas+',available:true,poster:'',keywords:['serie','romance','novelas','amour']},
{id:'mawu-sika',name:'Mawu-Sika',genre:'Cinéma africain',provider:'S+',available:true,poster:'',keywords:['cinema','africain','film']},
{id:'ligue-1-lyon',name:'Ligue 1 — Lyon vs Marseille',genre:'Sport',provider:'S+',available:true,poster:'',keywords:['sport','football','ligue 1']},
{id:'francen-francis',name:'Francen Francis',genre:'Séries',provider:'S+',available:true,poster:'',keywords:['serie','drame','france']},
{id:'coeur-corrompu',name:'Cœur corrompu',genre:'Séries',provider:'Novelas+',available:true,poster:'',keywords:['serie','romance','novelas','drame']},
{id:'comedie-laulite',name:'Comédie Laulite',genre:'Humour',provider:'S+',available:true,poster:'',keywords:['humour','comedie']},
{id:'comedie-ensemble',name:'Comédie — Ensemble',genre:'Humour',provider:'S+',available:true,poster:'',keywords:['humour','comedie']},
{id:'comedie-naturale',name:'Comédie Naturale',genre:'Humour',provider:'A+',available:true,poster:'',keywords:['humour','comedie']},
{id:'ligue-1-monaco',name:'Ligue 1 — PSG vs Monaco',genre:'Sport',provider:'S+',available:true,poster:'',keywords:['sport','football','ligue 1']}
];
let programs=seed.slice();
const input=document.getElementById('program-search'),results=document.getElementById('results');
const similarSection=document.getElementById('similar-section'),similar=document.getElementById('similar');
const title=document.getElementById('result-title'),empty=document.getElementById('empty-state');
function norm(v){return String(v||'').toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function tokens(v){return norm(v).split(/[^a-z0-9]+/).filter(t=>t.length>1)}
function inferredGenres(q){const x=norm(q),out=[];if(/sport|football|ligue|match|champion/.test(x))out.push('Sport');if(/film|cinema|action|thriller|horreur/.test(x))out.push('Cinéma','Cinéma africain');if(/serie|novela|amour|drame|romance/.test(x))out.push('Séries');if(/comedie|humour/.test(x))out.push('Humour');return out}
function score(p,q){
 const x=norm(q),n=norm(p.name),g=norm(p.genre),v=norm(p.provider),w=tokens(x);let s=0;
 if(n===x)s+=150;if(n.startsWith(x))s+=80;if(n.includes(x))s+=55;
 w.forEach(t=>{if(n.includes(t))s+=22;if(g.includes(t))s+=12;if(v.includes(t))s+=5;(p.keywords||[]).forEach(k=>{const z=norm(k);if(z.includes(t)||t.includes(z))s+=10})});
 inferredGenres(x).forEach(z=>{if(p.genre===z)s+=30});return s;
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function posterMarkup(p){if(p.poster)return '<img class="poster" loading="lazy" src="'+escapeHtml(p.poster)+'" alt="">';const i=String(p.name).trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'?';return '<div class="poster placeholder"><span>'+escapeHtml(i)+'</span></div>'}
function card(p){
 const el=document.createElement('article');el.className='card';el.tabIndex=0;
 el.innerHTML=posterMarkup(p)+'<div class="info"><div class="name"></div><div class="meta"></div><span class="badge"></span></div>';
 el.querySelector('.name').textContent=p.name;el.querySelector('.meta').textContent=p.genre+' · '+p.provider;
 const b=el.querySelector('.badge');b.textContent=p.available===false?'Indisponible':'Disponible';b.classList.add(p.available===false?'off':'live');return el;
}
function similarFor(q,exclude){
 const preferred=inferredGenres(q);
 return programs.filter(p=>!exclude.has(p.id)).map(p=>({p,s:score(p,q)+(preferred.includes(p.genre)?30:0)})).sort((a,b)=>b.s-a.s).slice(0,6).map(x=>x.p);
}
function render(){
 const q=input.value.trim();results.innerHTML='';similar.innerHTML='';similarSection.hidden=true;empty.hidden=true;
 if(!q){title.textContent='Programmes disponibles';programs.forEach(p=>results.appendChild(card(p)));return}
 const ranked=programs.map(p=>({p,s:score(p,q)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s);
 const available=ranked.filter(x=>x.p.available!==false).map(x=>x.p),unavailable=ranked.filter(x=>x.p.available===false).map(x=>x.p);
 const exact=programs.find(p=>norm(p.name)===norm(q));
 if(exact&&exact.available===false){
   title.textContent='Programme indisponible';results.appendChild(card(exact));
   const suggestions=similarFor(q,new Set([exact.id]));suggestions.forEach(p=>similar.appendChild(card(p)));similarSection.hidden=!suggestions.length;return;
 }
 if(available.length){
   title.textContent='Résultats pour « '+q+' »';available.forEach(p=>results.appendChild(card(p)));
   if(unavailable.length){similarSection.querySelector('h2').textContent='Autres programmes correspondants';unavailable.forEach(p=>similar.appendChild(card(p)));similarSection.hidden=false}
   return;
 }
 title.textContent='Programme introuvable';
 const suggestions=similarFor(q,new Set());
 if(suggestions.length){suggestions.forEach(p=>similar.appendChild(card(p)));similarSection.hidden=false}
 else{empty.hidden=false}
}
async function load(){
 try{const r=await fetch('/api/programs',{headers:{accept:'application/json'},cache:'no-store'});if(r.ok){const data=await r.json();if(Array.isArray(data)&&data.length)programs=data.map((p,i)=>({id:String(p.id||p.name||i),name:String(p.name||p.title||'Programme'),genre:String(p.genre||p.category||'Programme'),provider:String(p.provider||'StreamLive'),available:p.available!==false,poster:p.poster||p.posterUrl||'',keywords:Array.isArray(p.keywords)?p.keywords:[]}))}}catch(_){}
 render();
}
document.getElementById('search-form').addEventListener('submit',e=>e.preventDefault());input.addEventListener('input',render);load();
})();