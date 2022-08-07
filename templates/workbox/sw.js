importScripts('<%= options.workboxUrl %>')

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())

const { registerRoute } = workbox.routing
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { ExpirationPlugin } = workbox.expiration

// Cache page navigations (html) with a Network First strategy
registerRoute(
  ({ request }) => {
    return request.mode === 'navigate'
  },
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] })
    ]
  })
)

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] })
    ]
  })
)

// Demonstrates a custom cache name for a route.
// https://github.com/GoogleChrome/workbox/blob/63ea2ca52e7278411a71520f48bd9cf700694edd/demos/src/workbox-sw/sw.js
registerRoute(
  new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif|svga)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({ statuses: [200] }),
      // 50 entries max, 30 days max
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 })
    ],
  }),
);
