const CACHE_NAME = 'streamlive-app-v1';

self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Les téléchargements média et leurs éventuelles requêtes Range
  // restent gérés directement par le serveur.
  if (request.method !== 'GET' || url.pathname.startsWith('/api/download/')) return;

  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
