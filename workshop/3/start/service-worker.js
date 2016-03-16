/**
 * A service worker must be directly on the scope.
 * The service worker will only catch requests from clients under the service worker's scope.
 * The max scope for a service worker is the location of the worker.
 */

// Adjust this version and watch the effect it has on the workers when you refresh, then
// close the browser tab.
let version = 'v1-workshop-exercise-2';

console.info('Executing service worker for', version);

self.addEventListener('install', (event) => {
    console.info(version, 'installing');
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    let requestPath = event.request.url;

    console.info(version, 'requesting', event.request.url);

    if (!requestPath.endsWith('news.json')) {
        // returning undefined will not change the response or request.
        return;
    }

    // NOTE: the `respondWith` method is on the `event` object. It requires a `Response` object.
    event.respondWith(createNewsOverride());
});

function createNewsOverride() {
    let myNews = JSON.stringify({
        'news': [{
            'headline': 'I intercepted the request',
            'body': 'And this is the message of love I am bringing to you <3',
            'author': 'Gavin King',
            'avatar': 'gavin'
        }]
    });

    return new Response(myNews);
}
