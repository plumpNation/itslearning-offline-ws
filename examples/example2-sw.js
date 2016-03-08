/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// The files we want to cache
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

// Set the callback for the install step
self.addEventListener('install', function(event) {
    // Perform install steps
});
