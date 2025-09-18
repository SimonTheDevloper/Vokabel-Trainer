const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/html/vokabeltester-Vok-Auswahl.html',
    '/html/hinzufuegen.html',
    '/html/voktestmitids.html',
    '/html/wörterbuch.html',
    '/manifest.json',
    '/JS/script.js',
    '/icons/favicon-96x96.png',
    'index.html'

];

// Hier kommt der restliche Service Worker Code, wie in der ersten Antwort gezeigt
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache geöffnet');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});