/* StreamLive — runtime catalogue bridge */
(function(root){
  'use strict';
  const managerReady=()=>typeof root.StreamLiveChannelManager==='object';
  async function load(){
    try{
      const response=await fetch('/api/channels?mode=live',{headers:{accept:'application/json'},cache:'no-store'});
      if(!response.ok) throw new Error('HTTP_'+response.status);
      const channels=await response.json();
      if(!Array.isArray(channels)) throw new Error('INVALID_CATALOGUE');
      root.STREAMLIVE_CHANNELS=channels;
      root.dispatchEvent(new CustomEvent('streamlive:catalog-ready',{detail:{count:channels.length}}));
    }catch(error){
      root.dispatchEvent(new CustomEvent('streamlive:catalog-error',{detail:{error:String(error)}}));
    }
  }
  load();
})(window);
