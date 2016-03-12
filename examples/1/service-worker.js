/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// Adjust this version and watch the effect it has on the workers when you refresh, then
// close the browser tab.
var version = 'v2-lifecycle-example';

console.log('Executing ServiceWorker', version);

self.addEventListener('install', (event) => {
    console.info(version, 'installing');

    // to see the install stage in the dev tools
    // var aTimeHasPassed = delayBy(5);
    // event.waitUntil(aTimeHasPassed);

    // To activate the service worker immediately...
    // self.skipWaiting();

    // to force `redundant` state
    // throw new Error('SMASH');
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    console.info(version, 'requesting', event.request.url);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  HELPERS  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function delayBy(seconds) {
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('boom');
            resolve();
        }, seconds * 1000);
    });
}
