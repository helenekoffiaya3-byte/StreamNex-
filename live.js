(()=>{"use strict";
const state={channels:[],group:"all",query:"",selected:new Map(),layout:2,master:null,feedIndex:0,feedPlayers:new Map(),feedObserver:null,feedRequest:0};
const $=id=>document.getElementById(id);
document.addEventListener("DOMContentLoaded",init);

async function init(){
 $("refreshBtn")?.addEventListener("click",loadChannels);
 $("clearMultiBtn")?.addEventListener("click",clearMulti);
 $("openMultiBtn")?.addEventListener("click",()=>{$("multiLiveSection")?.scrollIntoView({behavior:"smooth"});openMultiPicker()});
 $("closeMultiPickerBtn")?.addEventListener("click",closeMultiPicker);
 $("multiPickerModal")?.addEventListener("click",e=>{if(e.target.matches("[data-close-multi-picker]"))closeMultiPicker()});
 $("channel-modal-close")?.addEventListener("click",closeChannelSelector);
 $("channel-modal")?.addEventListener("click",e=>{if(e.target.matches("[data-close-channel-selector]"))closeChannelSelector()});
 $("multiPickerSearch")?.addEventListener("input",renderMultiPicker);
 $("liveSearch")?.addEventListener("input",e=>{state.query=e.target.value.trim().toLowerCase();renderChannels()});
 document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
   document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
   b.classList.add("active");state.group=b.dataset.group||"all";renderChannels();renderFeed();
 }));
 document.querySelectorAll(".layout-btn").forEach(b=>b.addEventListener("click",()=>setLayout(Number(b.dataset.layout))));
 await loadChannels();
 setInterval(loadChannels,60000);
}

async function api(url){
 const r=await fetch(url,{headers:{Accept:"application/json"},credentials:"same-origin"});
 const d=await r.json().catch(()=>({}));
 if(!r.ok||d.success===false)throw Error(d.error||d.message||"Données LIVE indisponibles.");
 return d;
}

async function loadChannels(){
 try{
   const d=await api("/api/live/channels");
   state.channels=Array.isArray(d.channels)?d.channels:[];
   syncSelected();renderChannels();renderFeed();
 }catch(e){
   console.error("[StreamLive]",e);
   if(!state.channels.length&&$("channelList"))$("channelList").innerHTML='<div class="empty-card">Impossible de charger les chaînes LIVE.</div>';
 }
}

function syncSelected(){
 for(const [id,item] of state.selected){
   const c=state.channels.find(x=>x.id===id);
   if(!c?.liveAvailable||!c.occurrence){stopItem(item);state.selected.delete(id)}
   else item.channel=c;
 }
 if(state.master&&!state.selected.has(state.master))state.master=state.selected.keys().next().value||null;
}

function filtered(){
 return state.channels.filter(c=>(state.group==="all"||c.group===state.group)&&(!state.query||(c.name+" "+c.group+" "+(c.occurrence?.title||"")).toLowerCase().includes(state.query)));
}

function renderChannels(){
 const list=$("channelList");if(!list)return;
 const cs=filtered();$("channelCount").textContent=state.channels.length+" chaînes";list.replaceChildren();
 if(!cs.length){const e=document.createElement("div");e.className="empty-card";e.textContent="Aucune chaîne ne correspond.";list.append(e);return}
 cs.forEach(c=>list.append(createRow(c)));
}

function createRow(c){
 const row=document.createElement("article");row.className="channel-row"+(c.liveAvailable?"":" no-live");
 const poster=document.createElement("div");poster.className="channel-poster";
 const img=document.createElement("img");img.className="logo-only";img.src=c.logoUrl||"";img.alt=c.name+" — logo";img.loading="lazy";
 img.addEventListener("error",()=>{poster.replaceChildren();const f=document.createElement("div");f.className="poster-fallback";f.textContent=initials(c.name);poster.append(f)},{once:true});
 poster.append(img);
 if(c.liveAvailable){const d=document.createElement("span");d.className="live-dot";d.textContent="DIRECT";poster.append(d)}
 const info=document.createElement("div");info.className="channel-info";
 const n=document.createElement("div");n.className="channel-name";n.innerHTML='<span class="channel-number">#'+esc(c.number)+"</span>"+esc(c.name);info.append(n);
 const t=document.createElement("div");t.className="program-title";t.textContent=c.occurrence?.title||"Aucun programme EPG en cours";info.append(t);
 const m=document.createElement("div");m.className="program-meta";m.textContent=c.occurrence?meta(c.occurrence):"Programme non fourni par la source EPG";info.append(m);
 const s=document.createElement("div");s.className="channel-state";s.textContent=c.liveAvailable?"Flux LIVE réel disponible":c.occurrence?"Programme détecté — flux LIVE non disponible":"Aucun programme EPG en cours";info.append(s);
 const actions=document.createElement("div");actions.className="channel-actions";
 const watch=button("watch-btn","▶ Regarder",!c.liveAvailable,()=>openFeed(c.id));
 const multi=button("multi-btn",state.selected.has(c.id)?"✓ Multi-Live":"+ Multi-Live",!c.liveAvailable,()=>toggleMulti(c.id));
 if(state.selected.has(c.id))multi.classList.add("selected");
 actions.append(watch,multi);row.append(poster,info,actions);return row;
}

function button(cls,label,disabled,fn){
 const b=document.createElement("button");b.type="button";b.className=cls;b.textContent=label;b.disabled=disabled;b.addEventListener("click",fn);return b;
}

function renderFeed(){
 const box=$("liveFeed");if(!box)return;
 stopAllFeed();box.replaceChildren();
 const cs=filtered().filter(c=>c.liveAvailable&&c.occurrence?.occurrenceId);
 if(!cs.length){const e=document.createElement("div");e.className="empty-card";e.textContent="Aucun flux LIVE disponible dans cette catégorie.";box.append(e);return}
 cs.forEach((c,i)=>{
   const card=document.createElement("article");card.className="feed-card";card.dataset.channelId=c.id;
   const v=document.createElement("video");v.playsInline=true;v.autoplay=true;v.muted=true;v.preload=i<=1?"metadata":"none";
   const ov=document.createElement("div");ov.className="feed-overlay";
   const top=document.createElement("div");top.className="feed-top";
   const head=document.createElement("div");const badge=document.createElement("span");badge.className="live-badge";badge.textContent="DIRECT";
   const name=document.createElement("div");name.className="feed-channel";name.textContent=c.name;
   const prog=document.createElement("div");prog.className="feed-program";prog.textContent=c.occurrence?.title||"Programme LIVE";head.append(badge,name,prog);
   const acts=document.createElement("div");acts.className="feed-actions";
   const audio=button("round-action",i===0?"🔊":"🔇",false,()=>setFeedMaster(c.id));
   const fav=button("round-action",favoriteState(c.id)?"🌟":"⭐",false,()=>toggleFavorite(c.id,fav));fav.classList.toggle("active",favoriteState(c.id));
   const download=button("round-action","⬇️",c.occurrence?.downloadEnabled!==true,()=>downloadVod(c.occurrence?.programId));download.title="Télécharger";download.setAttribute("aria-label","Télécharger le programme");
   const share=button("round-action","📤",false,()=>shareChannel(c.id,c.name));
   const ml=button("round-action","▦",false,()=>{toggleMulti(c.id);$("multiLiveSection")?.scrollIntoView({behavior:"smooth"})});
   acts.append(audio,fav,download,share,ml);top.append(head,acts);
   const bottom=document.createElement("div");bottom.className="feed-bottom";const info=document.createElement("div");info.className="feed-info";
   const hint=document.createElement("div");hint.textContent="Swipe ↑ ↓ pour changer de chaîne";
   const progress=document.createElement("div");progress.className="feed-progress";const fill=document.createElement("i");fill.style.width=percent(c.occurrence)+"%";progress.append(fill);
   info.append(hint,progress);bottom.append(info);ov.append(top,bottom);card.append(v,ov);box.append(card);
   state.feedPlayers.set(c.id,{channel:c,video:v,hls:null,request:0});
 });
 setupFeedObserver(cs);if(cs[0])activateFeed(cs[0].id);
}

function setupFeedObserver(cs){
 const box=$("liveFeed");if(!box)return;if(state.feedObserver)state.feedObserver.disconnect();
 const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>.65)activateFeed(e.target.dataset.channelId)}),{root:box,threshold:[.65]});
 state.feedObserver=ob;box.querySelectorAll(".feed-card").forEach(x=>ob.observe(x));
}

async function activateFeed(id){
 const item=state.feedPlayers.get(id);if(!item)return;
 for(const [cid,x] of state.feedPlayers)if(cid!==id){x.video.pause();x.video.muted=true}
 state.feedIndex=Math.max(0,filtered().findIndex(c=>c.id===id));
 await ensureFeedData(item);
 if(!item.hls&&!item.video.src)await resolveFeed(item,true);
 preloadAdjacentChannels(state.feedIndex);cleanupFeedHls(state.feedIndex);setFeedMaster(id);
}

async function ensureFeedData(item){
 if(item.channelData||item.dataRequest)return item.channelData;
 item.dataRequest=++state.feedRequest;
 try{const d=await api("/api/channels/"+encodeURIComponent(item.channel.id));if(item.dataRequest===state.feedRequest)item.channelData=d.channel||d;return item.channelData}
 catch(e){console.warn("[Feed channel data]",e);return null}
}

async function preloadAdjacentChannels(currentIndex){
 const list=filtered().filter(c=>c.liveAvailable&&c.occurrence?.occurrenceId);
 for(const idx of [currentIndex-1,currentIndex+1]){
   const c=list[idx];if(!c)continue;const item=state.feedPlayers.get(c.id);if(!item||item.hls||item.loading)continue;
   item.loading=true;try{await ensureFeedData(item);await resolveFeed(item,false)}finally{item.loading=false}
 }
}

function cleanupFeedHls(currentIndex){
 const list=filtered().filter(c=>c.liveAvailable&&c.occurrence?.occurrenceId);
 const keep=new Set([list[currentIndex-1]?.id,list[currentIndex]?.id,list[currentIndex+1]?.id].filter(Boolean));
 for(const [id,item] of state.feedPlayers)if(!keep.has(id)&&item.hls)stopItem(item);
}

async function resolveFeed(item,isCurrent){
 const c=item.channel,id=++item.request;
 try{
   const q=new URLSearchParams({channelId:c.id,occurrenceId:String(c.occurrence.occurrenceId)});
   const d=await api("/api/programs/resolve-playback?"+q);
   if(id!==item.request||!item.video||d.mode!=="LIVE"||!d.playbackUrl)return;
   attach(item,d.playbackUrl,isCurrent);
 }catch(e){console.error("[Feed playback]",e)}
}

function attach(item,url,isCurrent=true){
 if(!url)return;const v=item.video;v.muted=!isCurrent;v.preload="metadata";
 if(/\.m3u8(?:$|[?#])/i.test(url)&&window.Hls&&Hls.isSupported()){
   const h=new Hls({enableWorker:true,lowLatencyMode:true,capLevelToPlayerSize:true,maxBufferLength:10,maxMaxBufferLength:15,liveSyncDuration:3,backBufferLength:10});
   item.hls=h;h.loadSource(url);h.attachMedia(v);h.on(Hls.Events.MANIFEST_PARSED,()=>{if(isCurrent)v.play().catch(()=>{})});return;
 }
 v.src=url;if(isCurrent)v.play().catch(()=>{});
}

function setFeedMaster(id){
 for(const [cid,x] of state.feedPlayers){
   const master=cid===id;x.video.muted=!master;x.video.volume=master?1:0;
   x.video.closest(".feed-card")?.querySelector(".round-action")?.classList.toggle("active",master);
 }
}

function stopAllFeed(){if(state.feedObserver)state.feedObserver.disconnect();for(const x of state.feedPlayers.values())stopItem(x);state.feedPlayers.clear()}

function toggleMulti(id){
 const c=state.channels.find(x=>x.id===id);if(!c?.liveAvailable||!c.occurrence?.occurrenceId)return;
 if(state.selected.has(id)){
   const item=state.selected.get(id);stopItem(item);state.selected.delete(id);
   if(state.master===id)state.master=state.selected.keys().next().value||null;
 }else{
   if(state.selected.size>=Math.min(9,state.layout)){openMultiPicker();return}
   state.selected.set(id,{channel:c,video:null,hls:null,request:0});
   if(!state.master)state.master=id;
 }
 renderMulti();renderChannels();renderMultiPicker();
}

function clearMulti(){for(const x of state.selected.values())stopItem(x);state.selected.clear();state.master=null;renderMulti();renderChannels()}

function setLayout(n){
 if(![2,4,9].includes(n))return;
 state.layout=n;
 document.querySelectorAll(".layout-btn").forEach(b=>b.classList.toggle("active",Number(b.dataset.layout)===n));
 if(state.selected.size>n){
   const ids=Array.from(state.selected.keys()).slice(n);
   ids.forEach(id=>{const x=state.selected.get(id);stopItem(x);state.selected.delete(id)});
   if(!state.selected.has(state.master))state.master=state.selected.keys().next().value||null;
 }
 renderMulti();renderChannels();
}

function renderMulti(){
 const grid=$("multiLiveGrid"),empty=$("multiLiveEmpty");if(!grid)return;
 for(const item of state.selected.values())stopItem(item);
 grid.className="multi-live-grid grid-"+state.layout;grid.replaceChildren();
 const ids=Array.from(state.selected.keys());
 for(let slot=0;slot<state.layout;slot++){
   const id=ids[slot];
   if(id){renderMultiCard(grid,id,state.selected.get(id));continue}
   const card=document.createElement("button");card.type="button";card.className="multi-slot-empty";card.textContent="+ Ajouter une chaîne";card.setAttribute("aria-label","Ajouter une chaîne au Multi-Live");card.addEventListener("click",()=>openChannelSelector(slot));grid.append(card);
 }
 if(empty)empty.style.display=state.selected.size?"none":"block";
 applyMaster();
}

function renderMultiCard(grid,id,item){
 const card=document.createElement("article");card.className="multi-live-card"+(state.master===id?" master":"");
 const v=document.createElement("video");v.controls=true;v.playsInline=true;v.autoplay=true;v.muted=state.master!==id;v.preload="metadata";item.video=v;
 v.addEventListener("click",()=>{state.master=id;applyMaster();renderMulti()});
 const metaEl=document.createElement("div");metaEl.className="multi-live-meta";
 const title=document.createElement("div");title.className="multi-live-title";const strong=document.createElement("strong");strong.textContent=item.channel.name;
 const acts=document.createElement("div");acts.className="slot-actions";
 const audio=button("slot-btn",state.master===id?"🔊":"🔇",false,()=>{state.master=id;applyMaster();renderMulti()});
 const remove=button("slot-btn","×",false,()=>{stopItem(item);state.selected.delete(id);if(state.master===id)state.master=state.selected.keys().next().value||null;renderMulti();renderChannels()});
 acts.append(audio,remove);title.append(strong,acts);
 const p=document.createElement("div");p.className="multi-live-program";p.textContent=item.channel.occurrence?.title||"Programme EPG";
 metaEl.append(title,p);card.append(v,metaEl);grid.append(card);resolveMulti(item);
}

async function openMultiPicker(){
 const modal=$("multiPickerModal");if(!modal)return;
 modal.hidden=false;modal.setAttribute("aria-hidden","false");
 const list=$("multiPickerList");if(list)list.innerHTML='<div class="loading-card">Chargement des chaînes…</div>';
 try{
   const d=await api("/api/channels");
   if(Array.isArray(d.channels))state.channels=d.channels;
   syncSelected();renderChannels();renderMultiPicker();
 }catch(e){console.warn("[Multi-Live picker]",e);if(list)list.innerHTML='<div class="empty-card">Impossible de charger les chaînes.</div>'}
 const input=$("multiPickerSearch");if(input){input.value="";renderMultiPicker();setTimeout(()=>input.focus(),0)}
}

let currentTargetCell=null;

function openChannelSelector(cellIndex){
 currentTargetCell=cellIndex;
 const modal=$("channel-modal"),list=$("modal-channel-list");
 if(!modal||!list)return;
 modal.classList.remove("modal-hidden");modal.setAttribute("aria-hidden","false");
 list.innerHTML='<div class="loading-card">Chargement des chaînes…</div>';
 renderChannelSelectorList();
}
function renderChannelSelectorList(){
 const list=$("modal-channel-list");if(!list)return;
 list.replaceChildren();
 const q=($("multiPickerSearch")?.value||"").trim().toLowerCase();
 const channels=state.channels.filter(c=>!q||(c.name+" "+c.group).toLowerCase().includes(q));
 channels.forEach(c=>{
   const playable=Boolean(c.liveAvailable&&c.occurrence?.occurrenceId);
   const b=document.createElement("button");b.type="button";b.className="channel-item-btn";b.disabled=!playable;
   b.textContent=(playable?"▶ ":"")+" "+(c.name||c.id)+(playable?"":" — LIVE indisponible");
   b.addEventListener("click",()=>{if(currentTargetCell==null)return;loadChannelInCell(currentTargetCell,c.id);closeChannelSelector()});
   list.append(b);
 });
 if(!channels.length){const e=document.createElement("div");e.className="empty-card";e.textContent="Aucune chaîne trouvée.";list.append(e)}
}
function closeChannelSelector(){
 const modal=$("channel-modal");if(modal){modal.classList.add("modal-hidden");modal.setAttribute("aria-hidden","true")}
 currentTargetCell=null;
}
async function loadChannelInCell(cellIndex,channelId){
 const ids=Array.from(state.selected.keys()),oldId=ids[cellIndex];
 if(oldId===channelId)return;
 if(oldId){const old=state.selected.get(oldId);stopItem(old);state.selected.delete(oldId);if(state.master===oldId)state.master=null}
 if(state.selected.has(channelId))return;
 const c=state.channels.find(x=>x.id===channelId);
 if(!c?.liveAvailable||!c.occurrence?.occurrenceId)return;
 state.selected.set(channelId,{channel:c,video:null,hls:null,request:0});
 if(!state.master)state.master=channelId;
 renderMulti();renderChannels();renderMultiPicker();
}
function closeMultiPicker(){const modal=$("multiPickerModal");if(!modal)return;modal.hidden=true;modal.setAttribute("aria-hidden","true")}

function renderMultiPicker(){
 const list=$("multiPickerList");if(!list)return;
 const q=($("multiPickerSearch")?.value||"").trim().toLowerCase();
 const available=state.channels.filter(c=>!q||(c.name+" "+c.group).toLowerCase().includes(q));
 list.replaceChildren();
 for(const c of available){
   const selected=state.selected.has(c.id),playable=Boolean(c.liveAvailable&&c.occurrence?.occurrenceId);
   const b=document.createElement("button");b.type="button";b.className="multi-picker-item";b.disabled=!playable||selected;
   const img=document.createElement("img");img.className="multi-picker-logo";img.src=c.logoUrl||"";img.alt="";img.loading="lazy";
   const info=document.createElement("div");const name=document.createElement("div");name.className="multi-picker-name";name.textContent=c.name;
   const st=document.createElement("div");st.className="multi-picker-state";st.textContent=selected?"Déjà sélectionnée":playable?"LIVE disponible":"LIVE indisponible";
   info.append(name,st);const tag=document.createElement("span");tag.textContent=selected?"✓":playable?"AJOUTER":"—";
   b.append(img,info,tag);
   b.addEventListener("click",()=>{if(state.selected.size>=state.layout){alert("Toutes les cases de cette grille sont occupées. Choisissez une autre case ou augmentez le nombre d’écrans.");return}toggleMulti(c.id);closeMultiPicker()});
   list.append(b);
 }
 if(!available.length){const e=document.createElement("div");e.className="empty-card";e.textContent="Aucune chaîne trouvée.";list.append(e)}
}

async function resolveMulti(item){
 const c=item.channel,request=++item.request;
 try{
   const q=new URLSearchParams({channelId:c.id,occurrenceId:String(c.occurrence.occurrenceId)});
   const d=await api("/api/programs/resolve-playback?"+q);
   if(request!==item.request||!item.video)return;
   if(d.mode==="LIVE"&&d.playbackUrl)attach(item,d.playbackUrl,state.master===c.id);
 }catch(e){console.error("[Multi-Live]",e)}
}

function applyMaster(){for(const [id,x] of state.selected){if(!x.video)continue;const m=id===state.master;x.video.muted=!m;x.video.volume=m?1:0}}

function stopItem(x){
 if(!x)return;
 if(x.hls){x.hls.destroy();x.hls=null}
 if(x.video){x.video.pause();x.video.removeAttribute("src");try{x.video.load()}catch{}}
 x.video=null;x.loading=false;++x.request;
}

function favoriteState(id){try{return JSON.parse(localStorage.getItem("streamlive_favorites")||"[]").includes(id)}catch{return false}}

function toggleFavorite(id,btn){
 let favorites=[];try{favorites=JSON.parse(localStorage.getItem("streamlive_favorites")||"[]")}catch{}
 if(favorites.includes(id))favorites=favorites.filter(x=>x!==id);else favorites.push(id);
 localStorage.setItem("streamlive_favorites",JSON.stringify(favorites));
 btn.textContent=favorites.includes(id)?"🌟":"⭐";btn.classList.toggle("active",favorites.includes(id));
}

async function downloadVod(programId){
 const id=String(programId||"").trim();if(!id){alert("Aucun programme VOD associé à cette chaîne.");return}
 const url="/api/vod/"+encodeURIComponent(id)+"/download";
 try{
   const response=await fetch(url,{method:"HEAD",credentials:"same-origin",headers:{Accept:"application/json"}});
   if(response.status===401){alert("Veuillez vous connecter pour télécharger ce programme.");return}
   if(response.status===404){alert("Ce programme n'est pas disponible en téléchargement actuellement.");return}
   if(!response.ok){alert("Le téléchargement n'est pas disponible pour ce programme.");return}
   window.location.assign(url);
 }catch(error){console.error("[VOD download]",error);alert("Une erreur est survenue, impossible de lancer le téléchargement.")}
}

async function shareChannel(id,name){
 const url=location.origin+"/channel/"+encodeURIComponent(id);
 try{
   if(navigator.share){await navigator.share({title:"Regarde "+name+" sur StreamLive",url});return}
   if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);alert("Lien copié dans le presse-papier !");return}
   const area=document.createElement("textarea");area.value=url;area.setAttribute("readonly","");area.style.position="fixed";area.style.opacity="0";document.body.append(area);area.select();document.execCommand("copy");area.remove();alert("Lien copié dans le presse-papier !");
 }catch(e){if(e?.name!=="AbortError")console.warn("[Share]",e)}
}

function openFeed(id){
 const box=$("liveFeed"),card=box?.querySelector('[data-channel-id="'+CSS.escape(id)+'"]');
 if(card){card.scrollIntoView({behavior:"smooth",block:"start"});activateFeed(id)}else{renderFeed();setTimeout(()=>openFeed(id),0)}
}

function percent(o){const a=Date.parse(o.startAt),b=Date.parse(o.endAt),n=Date.now();return Number.isFinite(a)&&Number.isFinite(b)&&b>a?Math.max(0,Math.min(100,(n-a)/(b-a)*100)):0}
function meta(o){return [time(o.startAt)&&time(o.endAt)?time(o.startAt)+" - "+time(o.endAt):"",o.seasonNumber!=null&&o.episodeNumber!=null?"S"+o.seasonNumber+" E"+o.episodeNumber:"",o.subtitle||""].filter(Boolean).join(" • ")}
function time(v){const d=new Date(v);return Number.isNaN(d.getTime())?"":d.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}
function initials(n){return String(n||"?").split(/\s+/).map(x=>x[0]||"").join("").slice(0,3).toUpperCase()}
function esc(v){return String(v??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]))}
window.StreamLiveLive={refresh:loadChannels,clearMulti,openFeed,openMultiPicker};
})();