const CACHE_NAME='streamlive-shell-v2';
const SHELL=['/','/style.css','/app.js','/player.js','/offline.js','/lib/downloadManager.js','/live.html','/live.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const req=event.request; const url=new URL(req.url);
 if(req.method!=='GET'||url.pathname.startsWith('/api/')||url.pathname.endsWith('.m3u8')||url.pathname.endsWith('.ts')) return;
 event.respondWith(fetch(req).then(res=>{if(req.url.startsWith(self.location.origin)&&res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));}return res;}).catch(()=>caches.match(req).then(c=>c||caches.match('/'))));
});
