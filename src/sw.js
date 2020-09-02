const CACHE_NAME = 'coco_cache_v6';
const FILES_TO_CACHE = ['/offline.html'];

// -------- caching files --------------
self.addEventListener('install', (evt) => {
    console.log('ServiceWorker install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('precaching');
            return cache.addAll(['/offline.html']);
        })
    );
});

// -------- take files from cache --------------
self.addEventListener('fetch', (evt) => {
    const { request } = evt;
    if (request.headers.has('range')) return;

    if (request.mode === 'navigate') {
        evt.respondWith(
            fetch(request).catch((err) => {
                console.log('offline mode', err);
                return fetch(new Request('/offline.html'));
                // return caches.open(CACHE_NAME).then(cache => {return cache.match('offline.html')})
            })
        );
    }
});

// -------- clear cache --------------
self.addEventListener('activate', (evt) => {
    const cacheAllowList = ['coco_cache'];
    evt.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheAllowList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});