/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// Adjust this version and watch the effect it has on the workers when you refresh, then
// close the browser tab.
let version = 'v1-request-intercept';

console.log('Executing ServiceWorker', version);

self.addEventListener('install', (event) => {
    console.info(version, 'installing');
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    console.info(version, 'requesting', event.request);

    // if it's not our snippet
    if (!event.request.url.endsWith('/snippet.html')) {
        // do nothing
        return;
    }

    // but if it is, mess with it.
    console.info('intercepting request');

    event.respondWith(new Response('<h2>Bazinga!</h2>'));
});
