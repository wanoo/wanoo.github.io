// The web-scumm app installed from this address (its service worker scoped to /web-scumm/) is retired: the project
// is quest'n'click now, at /quest-n-click/. This worker takes the old one's place once, unregisters itself, and
// reloads its pages, which then reach the redirect. Nothing else is touched: the saves and the caches are shared with
// the new app on this origin (the same names).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.registration.unregister();
      const pages = await self.clients.matchAll({ type: 'window' });
      for (const page of pages) page.navigate(page.url);
    })(),
  );
});
