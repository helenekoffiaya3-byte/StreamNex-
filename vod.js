const state={items:[],search:'',type:'',availability:''};
const $=s=>document.querySelector(s);

function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function render(){
  const list=state.items.filter(x=>{
    const q=state.search.toLowerCase();
    const text=[x.title,x.description,x.category,x.originalChannelName].filter(Boolean).join(' ').toLowerCase();
    if(q&&!text.includes(q))return false;
    if(state.type&&x.type!==state.type)return false;
    if(state.availability==='available'&&!x.mediaAvailable)return false;
    if(state.availability==='catalog'&&x.mediaAvailable)return false;
    return true;
  });
  $('#stats').textContent=list.length+' résultat(s) · '+state.items.length+' catalogue(s)';
  $('#grid').innerHTML=list.length?list.map(x=>`
    <article class="vod-card">
      <div class="vod-poster">${x.poster?'<img src="'+esc(x.poster)+'" alt="">':'<span>STREAMLIVE</span>'}</div>
      <div class="vod-body">
        <div class="vod-title">${esc(x.title)}</div>
        <div class="vod-meta">${esc(x.typeLabel)}${x.originalChannelName?' · '+esc(x.originalChannelName):''}</div>
        <span class="vod-badge ${x.mediaAvailable?'available':''}">${x.mediaAvailable?'Média disponible':'Catalogue uniquement'}</span>
        ${x.mediaAvailable?'<a class="vod-watch" href="/vod/player?id='+encodeURIComponent(x.id)+'">▶ Lire</a>':''}
      </div>
    </article>`).join(''):'<div class="vod-empty">Aucun contenu ne correspond aux filtres.</div>';
}

async function load(){
  try{
    const r=await fetch('/api/vod');
    const data=await r.json();
    if(!r.ok||!data.success)throw new Error(data.error||'Erreur');
    state.items=data.items||[];
    render();
  }catch(e){
    $('#stats').textContent='Erreur de chargement';
    $('#grid').innerHTML='<div class="vod-empty">'+esc(e.message)+'</div>';
  }
}
$('#search').addEventListener('input',e=>{state.search=e.target.value;render()});
$('#type').addEventListener('change',e=>{state.type=e.target.value;render()});
$('#availability').addEventListener('change',e=>{state.availability=e.target.value;render()});
load();
