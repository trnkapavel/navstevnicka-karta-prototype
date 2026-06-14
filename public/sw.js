const CACHE = "nk-berounsko-v1";

const PRECACHE = [
  "/app",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // Obrázky z Unsplash — network first, pak cache
  if (e.request.url.includes("unsplash.com")) {
    e.respondWith(
      fetch(e.request)
        .then((r) => {
          const clone = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // App shell — cache first
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request).then((r) => {
        if (r.ok) {
          caches.open(CACHE).then((c) => c.put(e.request, r.clone()));
        }
        return r;
      });
      return cached || network;
    })
  );
});
