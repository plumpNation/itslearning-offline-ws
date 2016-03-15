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

    if (requestPath.endsWith('news.json')) {
        let newsUpdate = {
                'headline': 'I intercepted the request',
                'body': 'And this is the message of love I am bringing to you <3',
                'author': 'Gavin King',
                'avatar': 'gavin'
            },

            updatedNews = updateNews(event.request, newsUpdate);

        console.info('intercepted news request, adding more to the end');

        event.respondWith(updatedNews);
    }
});

function updateNews(request, additionalNews) {
    return fetch(request)
        .then((response) => response.json())
        .then((response) => {
            response.news = response.news.concat(additionalNews);

            return new Response(JSON.stringify(response));
        })
}
