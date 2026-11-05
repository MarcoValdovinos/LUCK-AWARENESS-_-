const CACHE_NAME = 'kronos-luck-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    './css/responsive.css',
    './css/accessibility.css',
    './js/hash-utils.js',
    './js/campaign-parser.js',
    './js/red-flag-detector.js',
    './js/risk-score.js',
    './js/evidence-vault.js',
    './js/report-generator.js',
    './js/main.js',
    './manifest.json'
];

// Instalar Service Worker y guardar en caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 Cacheando assets estáticos');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Interceptar peticiones para funcionar offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Devuelve el cache si existe, si no, hace la petición a la red
            return response || fetch(event.request);
        })
    );
});

// Limpiar cachés antiguos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});