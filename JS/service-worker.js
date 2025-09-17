const CACHE_NAME = 'note-pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/html/hinzufügen.html',
    '/html/vokabeltester-Vok-Auswahl.html',
    '/html/voktestmitids.html',
    '/html/wörterbuch.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Gib die gecachte Ressource zurück
                }
                return fetch(event.request); // Wenn nicht im Cache, fetch vom Netzwerk
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Alte Caches löschen
                    }
                })
            );
        })
    );
});