/* StreamLive — espace utilisateur privé : recherche de programmes.
 * Le catalogue réel peut être fourni par /api/programs.
 * Les suggestions similaires restent disponibles quand un programme est absent
 * ou marqué indisponible.
 */
(function(){
'use strict';
const seed=[
{name:'Cacao',genre:'Séries',provider:'S+',available:true},
{name:'Karate Kid Legends',genre:'Cinéma',provider:'S+',available:true},
{name:'Invisible',genre:'Séries',provider:'S+',available:true},
{name:'Amour profond',genre:'Séries',provider:'Novelas+',available:true},
{name:'Mawu-Sika',genre:'Cinéma africain',provider:'S+',available:true},
{name:'Francen Francis',genre:'Séries',provider:'S+',available:true},
{name:'Cœur corrompu',genre:'Séries',provider:'Novelas+',available:true},
{name:'Comédie Laulite',genre:'Humour',provider:'S+',available:true},
{name:'Comédie Naturale',genre:'Humour',provider:'A+',available:true},
{name:'Clash',genre:'Séries',provider:'S+',available:true},
{name:'Les Aigles de la République',genre:'Cinéma',provider:'S+',available:true},
{name:'African Superstars',genre:'Divertissement',provider:'S+',available:true},
{name:'Scream',genre:'Cinéma',provider:'S+',available:true},
{name:'La Dona',genre:'Séries',provider:'Novelas+',available:true},
{name:'Sous le Masque',genre:'Séries',provider:'A+',available:true}
];
let programs=seed.slice();
const input=document.getElementById('program-search'),results=document.getElementById('results');
const similarSection=document.getElementById('similar-section'),similar=document.getElementById('similar'),title=document.getElementById('result-title');

function norm(v){return String(v||'').toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function score(p,q){const n=norm(p.name),g=norm(p.genre),x=norm(q);let s=0;if(n===x)s+=100;if(n.startsWith(x))s+=50;if(n.includes(x))s+=30;x.split(/\s+/).filter(Boolean).forEach(t=>{if(n.includes(t))s+=10;if(g.includes(t))s+=3});return s}
function card(p){const el=document.createElement('article');el.className='card';el.tabIndex=0;el.innerHTML='<div class="info"><div class="name"></div><div class="meta"></div><span class="badge"></span></div>';el.querySelector('.name').textContent=p.name;el.querySelector('.meta').textContent=p.genre+' · '+p.provider;const b=el.querySelector('.badge');b.textContent=p.available===false?'Indisponible':'Disponible';if(p.available===false)b.classList.add('off');else b.classList.add('live');return el}
function render(){
const q=input.value.trim(), matches=q?programs.filter(p=>score(p,q)>0).sort((a,b)=>score(b,q)-score(a,q)):programs;
results.innerHTML='';similar.innerHTML='';similarSection.hidden=true;
if(!q){title.textContent='Programmes disponibles';matches.forEach(p=>results.appendChild(card(p)));return}
const exact=matches.filter(p=>norm(p.name)===norm(q));
const available=matches.filter(p=>p.available!==false);
if(available.length){
title.textContent='Résultats pour « '+q+' »';
available.forEach(p=>results.appendChild(card(p)));
const unavailable=matches.filter(p=>p.available===false);
if(unavailable.length){unavailable.forEach(p=>{const c=card(p);c.querySelector('.badge').textContent='Indisponible actuellement';similar.appendChild(c)});similarSection.hidden=false}
}else{
title.textContent='Programme introuvable ou indisponible';
const suggestions=programs.slice().sort((a,b)=>score(b,q)-score(a,q)).filter(p=>score(p,q)>0).slice(0,6);
if(suggestions.length){suggestions.forEach(p=>similar.appendChild(card(p)));similarSection.hidden=false}
else{results.innerHTML='<div class="empty" style="grid-column:1/-1"><strong>Aucun programme trouvé</strong>Nous vous proposerons des programmes similaires dès que le catalogue correspondant sera disponible.</div>'}
}
}
async function load(){
try{const r=await fetch('/api/programs',{headers:{accept:'application/json'},cache:'no-store'});if(r.ok){const data=await r.json();if(Array.isArray(data)&&data.length)programs=data}}
catch(_){}
render();
}
document.getElementById('search-form').addEventListener('submit',e=>e.preventDefault());
input.addEventListener('input',render);load();
})();