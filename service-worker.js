// Files to cache
const cacheName = 'myCache-v1';
const cacheAssets = [
    '/',
    '/index.html',
    '/style.css',
    '/newt.js'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    // Remove old caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match('/index.html'))
        );
    } else {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    }
});