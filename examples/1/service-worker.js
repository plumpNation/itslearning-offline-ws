/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// Adjust this version and watch the effect it has on the workers when you refresh, then
// close the browser tab.
var version = 'v1';

console.log('Running Service Worker', version);

self.addEventListener('install', function (event) {
    console.info(version, 'installing');
});

self.addEventListener('activate', function (event) {
    console.info(version, 'activating');
});

self.addEventListener('fetch', function (event) {
    console.info(version, 'requesting', event.request);
});