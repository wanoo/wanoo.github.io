// The web-scumm app installed from this address (its service worker scoped to /web-scumm/) is retired: the project
// is quest'n'click now, at /quest-n-click/. This worker takes the old one's place once, unregisters itself, and
// reloads its pages, which then reach the redirect. Saves are untouched (same origin, same storage).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map((n) => caches.delete(n)));
      await self.registration.unregister();
      const pages = await self.clients.matchAll({ type: 'window' });
      for (const page of pages) page.navigate(page.url);
    })(),
  );
});
