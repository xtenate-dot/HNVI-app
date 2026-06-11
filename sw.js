const CACHE = 'hnvi-v1';
const BESTANDEN = ['./app.html', './manifest.json', './icons/icon48.png', './icons/icon128.png', './icons/icon512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BESTANDEN)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Altijd netwerk proberen, cache als fallback
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
