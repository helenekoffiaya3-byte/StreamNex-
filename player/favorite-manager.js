/* StreamLive — Favorites
 * Persists favorite channel IDs in the browser only.
 */
(function(root){
  'use strict';
  const STORAGE_KEY='streamlive:favorites:v1';

  function read(){
    try{
      const value=JSON.parse(root.localStorage.getItem(STORAGE_KEY)||'[]');
      return Array.isArray(value)?value.filter(v=>typeof v==='string'):[];
    }catch(_){ return []; }
  }
  function write(ids){
    try{ root.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids)))); }
    catch(_){}
  }
  function getFavorites(){ return read(); }
  function isFavorite(id){ return read().includes(String(id)); }
  function toggle(id){
    id=String(id);
    const ids=read();
    const index=ids.indexOf(id);
    if(index>=0){ids.splice(index,1);write(ids);return false;}
    ids.push(id);write(ids);return true;
  }
  root.StreamLiveFavorites={getFavorites,isFavorite,toggle,clear:function(){write([])}};
})(window);
