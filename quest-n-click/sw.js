// The app installed from this address (its service worker scoped to /quest-n-click/) is retired: Quest'n'Click
// moved to https://quest-n-click.github.io (24 Oct 2026). This worker takes the old one's place once, unregisters itself, and
// reloads its pages, which then reach the redirect. Nothing else is touched. The saves stay on this origin: the new
// site is another origin and cannot read them.
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
