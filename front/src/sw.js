importScripts('workbox/workbox-sw.js', 'sw.base.js');

workbox.setConfig({
    debug: true,
    modulePathPrefix: 'workbox/'
});

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp('/$'),
  new workbox.strategies.CacheFirst()
);
