const CACHE_NAME = 'constelacion-v5'; // Le subimos la versión
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Instalar el Service Worker y guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para que funcione offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la versión en caché si existe, si no, va a la red
        return response || fetch(event.request);
      })
  );
});
