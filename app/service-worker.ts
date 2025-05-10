/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = "starcast-cache-v1";

// Resurse care vor fi pre-cache-uite
const PRECACHE_ASSETS = ["/", "/videos/tiktok-live-bg.mp4"];

// Instalare service worker
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Activare service worker
self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

// Strategia de cache: Cache First, apoi Network
self.addEventListener("fetch", (event: FetchEvent) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Pentru imagini și videoclipuri, folosim cache-first
  if (
    event.request.url.match(/\.(mp4|webm|jpg|jpeg|png|gif|svg|webp)$/) ||
    event.request.url.includes("/images/") ||
    event.request.url.includes("/videos/")
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((response) => {
          // Verificați dacă răspunsul este valid
          if (!response || response.status !== 200 || response.type !== "basic") {
            return new Response("", { status: 404 }); // Returnează un răspuns gol sau un 404
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
    return;
  }

  // Pentru restul resurselor, folosim network-first
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return new Response("", { status: 404 }); // Returnează un răspuns gol sau un 404
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (!cachedResponse) {
            return new Response("", { status: 404 }); // Returnează un răspuns gol sau un 404
          }
          return cachedResponse;
        });
      })
  );
});

export {};
