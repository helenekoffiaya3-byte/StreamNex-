class StreamLivePlayer {
  constructor(ids = {}) {
    this.video=document.getElementById(ids.videoId||'streamVideo');
    this.modal=document.getElementById(ids.modalId||'modal');
    this.title=document.getElementById(ids.titleId||'playerTitle');
    this.status=document.getElementById(ids.statusId||'playerStatus');
    this.note=document.getElementById(ids.noteId||'playerNote');
    this.empty=document.getElementById(ids.emptyId||'playerEmpty');
    this.hls=null;
    if(!this.video) throw new Error('Lecteur vidéo StreamLive introuvable.');
    this.video.addEventListener('ended',()=>{if(window.shuffleMode) window.scheduleRandomFallback?.();});
    this.video.addEventListener('error',()=>{if(window.shuffleMode) window.scheduleRandomFallback?.();});
  }
  setLoading(message){
    this.stopPlayback();
    this.modal?.classList.add('open');
    if(this.empty)this.empty.style.display='block';
    this.video.style.display='none';
    if(this.status)this.status.textContent=message;
    if(this.note)this.note.textContent='Flux non exposé au navigateur';
  }
  async selectProgram(channelId,occurrenceId,title='Aucun programme sélectionné',metaDetails='',posterUrl=null){
    if(this.title)this.title.textContent=title;
    this.setLoading(occurrenceId?'Résolution du flux par le serveur…':'Sélectionnez un créneau EPG disponible.');
    if(posterUrl)this.video.poster=posterUrl;else this.video.removeAttribute('poster');
    if(!occurrenceId)return;
    return this.resolveAndPlay(channelId,occurrenceId,metaDetails);
  }
  async resolveAndPlay(channelId,occurrenceId,metaDetails=''){
    try{
      const q=new URLSearchParams({channelId:String(channelId),occurrenceId:String(occurrenceId)});
      const r=await fetch('/api/programs/resolve-playback?'+q,{headers:{Accept:'application/json'}});
      const data=await r.json().catch(()=>({}));
      if(!r.ok||!data.success)throw new Error(data.error||'Résolution du programme impossible.');
      if(this.title&&data.programTitle)this.title.textContent=data.programTitle;
      if(data.mode==='NONE'||!data.playbackUrl){this.showError(data.message||'Aucune source vidéo réelle et autorisée n’est disponible.');return;}
      if(this.note)this.note.textContent=data.mode+' — flux résolu par le serveur';
      await this.loadSource(data.playbackUrl,data.mode);
      if(this.status&&metaDetails)this.status.textContent=metaDetails;
    }catch(e){this.showError(e.message||'Lecture indisponible.');}
  }
  loadSource(url,mode){
    if(!/^https?:\/\//i.test(String(url)))return Promise.reject(new Error('Source vidéo invalide.'));
    const isHls=/\.m3u8(?:$|[?#])/i.test(url);
    if(isHls&&window.Hls&&Hls.isSupported()){
      const hls=new Hls({enableWorker:true,lowLatencyMode:mode==='LIVE',backBufferLength:mode==='LIVE'?30:90});
      this.hls=hls;window.streamLiveHls=hls;
      hls.on(Hls.Events.ERROR,(_e,d)=>{if(d?.fatal){this.showError('Le flux vidéo est devenu indisponible.');hls.destroy();this.hls=null;window.streamLiveHls=null;}});
      hls.on(Hls.Events.MANIFEST_PARSED,()=>{this.showVideo();this.video.play().catch(()=>{if(this.status)this.status.textContent='Appuyez sur ▶ pour démarrer la lecture.';});});
      hls.loadSource(url);hls.attachMedia(this.video);return Promise.resolve();
    }
    if(isHls&&this.video.canPlayType('application/vnd.apple.mpegurl')){
      this.video.src=url;this.video.onloadedmetadata=()=>{this.showVideo();this.video.play().catch(()=>{});};this.video.onerror=()=>this.showError('Le flux vidéo est indisponible ou inaccessible.');return Promise.resolve();
    }
    if(!isHls){
      this.video.src=url;this.video.onloadedmetadata=()=>this.showVideo();this.video.onerror=()=>this.showError('La vidéo est indisponible ou inaccessible.');return Promise.resolve();
    }
    return Promise.reject(new Error('Ce navigateur ne prend pas en charge HLS.'));
  }
  showVideo(){if(this.empty)this.empty.style.display='none';this.video.style.display='block';}
  showError(message){if(this.empty)this.empty.style.display='block';this.video.style.display='none';if(this.status)this.status.textContent=message;if(this.note)this.note.textContent='Lecture indisponible';}
  stopPlayback(){this.video.pause();this.video.removeAttribute('src');this.video.load();this.video.style.display='none';if(this.hls)this.hls.destroy();this.hls=null;window.streamLiveHls=null;this.video.onloadedmetadata=null;this.video.onerror=null;}
  close(){this.stopPlayback();this.modal?.classList.remove('open');}
}
window.StreamLivePlayer=StreamLivePlayer;