/* StreamLive — Channel Selector UI (Étape 2.3)
 * The selector consumes window.StreamLiveChannelManager only.
 * It never owns stream URLs.
 */
(function(root){
  'use strict';
  function init(){
    const manager=root.StreamLiveChannelManager;
    const favorites=root.StreamLiveFavorites;
    const list=root.document.getElementById('channel-list');
    const search=root.document.getElementById('channel-search');
    const group=root.document.getElementById('channel-group');
    const count=root.document.getElementById('channel-count');
    const feedback=root.document.getElementById('channel-feedback');
    if(!manager||!list) return;

    let channels=manager.getChannels();
    let selectedId=null;
    let favoritesOnly=false;

    function groups(){
      return Array.from(new Set(channels.map(c=>c.group).filter(Boolean))).sort((a,b)=>a.localeCompare(b,'fr'));
    }
    function renderGroups(){
      if(!group) return;
      const current=group.value;
      group.innerHTML='<option value="">Toutes les catégories</option>';
      groups().forEach(g=>{const o=document.createElement('option');o.value=g;o.textContent=g;group.appendChild(o);});
      if(groups().includes(current)) group.value=current;
    }
    function render(){
      const q=(search?.value||'').trim().toLocaleLowerCase('fr');
      const g=group?.value||'';
      const filtered=channels.filter(c=>{
        const hay=(c.name+' '+c.id+' '+c.channelNumber).toLocaleLowerCase('fr');
        return (!q||hay.includes(q))&&(!g||c.group===g)&&(!favoritesOnly||favorites?.isFavorite(c.id));
      });
      list.innerHTML='';
      if(count) count.textContent=filtered.length+' chaîne'+(filtered.length>1?'s':'');
      if(!filtered.length){
        list.innerHTML='<div class="channel-empty">'+(favoritesOnly?'Aucun favori enregistré.':'Aucune chaîne trouvée.')+'</div>';
        return;
      }
      filtered.forEach(channel=>{
        const button=document.createElement('button');
        button.type='button';
        button.className='channel-item'+(channel.id===selectedId?' selected':'');
        button.dataset.channelId=channel.id;
        button.setAttribute('aria-label','Lire '+channel.name);
        const logo=channel.logoUrl?'<img loading="lazy" alt="" src="'+escapeHtml(channel.logoUrl)+'" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{textContent:initials(channel.name),className:\'logo-fallback\'}))">':'';
        const fav=favorites?.isFavorite(channel.id);
        button.innerHTML='<span class="channel-logo">'+logo+'<span class="logo-fallback">'+initials(channel.name)+'</span></span><span class="channel-meta"><strong>'+escapeHtml(channel.name)+'</strong><small>'+escapeHtml(String(channel.channelNumber))+(channel.group?' · '+escapeHtml(channel.group):'')+'</small></span><span class="channel-state">'+(channel.streamEnabled?'●':'○')+'</span><span class="channel-favorite" aria-label="'+(fav?'Retirer des favoris':'Ajouter aux favoris')+'">'+(fav?'★':'☆')+'</span>';
        const image=button.querySelector('img'); if(image){const fallback=button.querySelector('.logo-fallback'); fallback.style.display='none'; image.addEventListener('error',()=>{fallback.style.display='grid';},{once:true});}
        button.querySelector('.channel-favorite').addEventListener('click',(event)=>{event.stopPropagation(); if(favorites){favorites.toggle(channel.id); render();}});
        button.addEventListener('click',()=>select(channel.id));
        list.appendChild(button);
      });
    }
    function initials(value){return String(value).trim().split(/\s+/).slice(0,2).map(v=>v[0]||'').join('').toUpperCase()||'?';}
    function escapeHtml(value){
      return String(value).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    }
    function select(id){
      const result=manager.select(id,{mode:'live'});
      if(!result.ok){
        if(feedback){
          feedback.textContent=result.code==='STREAM_UNAVAILABLE'?'Flux indisponible pour cette chaîne.':result.code==='PLAYER_NOT_READY'?'Lecteur en cours d’initialisation…':'Chaîne introuvable.';
          feedback.className='channel-feedback error';
        }
        return;
      }
      selectedId=result.channel.id;
      if(feedback){feedback.textContent='Lecture : '+result.channel.name;feedback.className='channel-feedback success';}
      render();
    }
    search?.addEventListener('input',render);
    group?.addEventListener('change',render);
    const favoriteToggle=root.document.getElementById('favorites-toggle');
    favoriteToggle?.addEventListener('click',()=>{favoritesOnly=!favoritesOnly; favoriteToggle.setAttribute('aria-pressed',String(favoritesOnly)); favoriteToggle.textContent=favoritesOnly?'★ Favoris':'☆ Favoris'; render();});
    root.addEventListener('streamlive:channel-selected',e=>{
      if(e.detail?.channel?.id){selectedId=e.detail.channel.id;render();}
    });
    root.addEventListener('streamlive:catalog-ready',()=>{
      channels=manager.getChannels();
      renderGroups();
      render();
    });
    renderGroups();
    render();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})(window);
