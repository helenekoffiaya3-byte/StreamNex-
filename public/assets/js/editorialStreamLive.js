(()=>{"use strict";
class EditorialStreamLivePlayer {
  constructor(){
    this.video=document.getElementById("editorial-live-video");
    this.placeholder=document.getElementById("editorial-live-placeholder");
    this.title=document.getElementById("editorial-live-title");
    this.time=document.getElementById("editorial-live-time");
    this.progress=document.getElementById("editorial-live-progress");
    this.next=document.getElementById("editorial-next");
    this.badge=document.getElementById("editorial-live-badge");
    this.timer=null;this.progressTimer=null;this.hls=null;this.programId=null;this.activeProgram=null;
  }
  async init(){await this.sync();this.progressTimer=setInterval(()=>this.updateProgress(),1000)}
  async sync(){
    try{
      const r=await fetch("/api/editorial/streamlive/current",{headers:{Accept:"application/json"}});
      const d=await r.json();if(!r.ok||!d.success)throw Error(d.message||"Programme indisponible");
      this.render(d);
      this.scheduleNext(d);
      if(this.programId!==d.activeProgram.id){this.programId=d.activeProgram.id;await this.play(d)}
    }catch(e){console.error("[Editorial StreamLive]",e);this.show("Programmation temporairement indisponible.")}
  }
  render(d){
    const p=d.activeProgram;
    this.activeProgram=p;this.title.textContent=p.title||"Programme en cours";
    this.time.textContent=p.startTime+" — "+p.endTime;
    this.next.textContent="À suivre : "+(d.nextProgram?.title||"—")+" ("+(d.nextProgram?.startTime||"--:--")+")";
    this.badge.textContent="🔴 EN DIRECT";
    this.updateProgress(d.abidjanTime,p);
  }
  updateProgress(serverTime,p=null){
    p=p||this.activeProgram;if(!p)return;
    const now=new Date();const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Abidjan",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).formatToParts(now);
    const current=parts.filter(x=>["hour","minute","second"].includes(x.type)).reduce((a,x)=>a+(x.type==="hour"?Number(x.value)*3600:x.type==="minute"?Number(x.value)*60:Number(x.value)),0);
    const sec=s=>{const [h,m]=s.split(":").map(Number);return h*3600+m*60};
    const end=sec(p.endTime)===0?86400:sec(p.endTime),start=sec(p.startTime);
    const pct=Math.max(0,Math.min(100,(current-start)/(end-start)*100));
    this.progress.style.width=pct.toFixed(2)+"%";
  }
  scheduleNext(d){
    clearTimeout(this.timer);
    const sec=s=>{const [h,m]=s.split(":").map(Number);return h*3600+m*60};
    const now=sec(d.abidjanTime),end=sec(d.activeProgram.endTime)===0?86400:sec(d.activeProgram.endTime);
    let remaining=(end-now)*1000;
    if(remaining<1000)remaining=1000;
    this.timer=setTimeout(()=>this.sync(),remaining+1000);
  }
  async play(d){
    this.destroyHls();
    if(!d.canPlay||!d.activeProgram.mediaAvailable){this.show("Programme détecté. Média VOD en attente.");return}
    const p=d.activeProgram;
    const offset=Math.max(0,(this.toSeconds(d.abidjanTime)-this.toSeconds(p.startTime)));
    if(!p.playbackUrl){this.show("Média VOD introuvable.");return}
    this.placeholder.classList.add("hidden");this.video.hidden=false;
    if(window.Hls&&Hls.isSupported()&&p.playbackUrl.endsWith(".m3u8")){
      this.hls=new Hls({enableWorker:true,lowLatencyMode:true,capLevelToPlayerSize:true,maxBufferLength:10,liveSyncDuration:3});
      this.hls.loadSource(p.playbackUrl);this.hls.attachMedia(this.video);
      this.hls.on(Hls.Events.MANIFEST_PARSED,()=>this.video.play().catch(()=>{}));return;
    }
    this.video.src=p.playbackUrl;this.video.load();
    this.video.addEventListener("loadedmetadata",()=>{this.video.currentTime=Math.min(offset,Math.max(0,this.video.duration-0.25));this.video.play().catch(()=>{})},{once:true});
    this.lockSeek();
  }
  lockSeek(){
    if(this.seekLocked)return;this.seekLocked=true;let last=0;
    this.video.addEventListener("timeupdate",()=>{if(!this.video.seeking)last=this.video.currentTime});
    this.video.addEventListener("seeking",()=>{if(Math.abs(this.video.currentTime-last)>2)this.video.currentTime=last});
  }
  show(message){this.destroyHls();this.video.pause();this.video.hidden=true;this.placeholder.textContent=message;this.placeholder.classList.remove("hidden")}
  destroyHls(){if(this.hls){this.hls.destroy();this.hls=null}}
  toSeconds(s){const [h,m]=s.split(":").map(Number);return h*3600+m*60}
}
document.addEventListener("DOMContentLoaded",()=>{const p=new EditorialStreamLivePlayer;p.init();window.editorialStreamLivePlayer=p});
})();