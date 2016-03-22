let version = 'v1-intercept-fetch';

console.info('Executing service worker for', version);

self.addEventListener('install', (event) => {
    console.info(version, 'installing');
});

self.addEventListener('activate', (event) => {
    console.info(version, 'activating');
});

self.addEventListener('fetch', (event) => {
    console.info(version, 'requesting', event.request.url);

    if (!event.request.url.endsWith('news.json')) {
        // returning undefined will not change the response or request.
        return;
    }

    let myNews = JSON.stringify({
        'news': [{
            'headline': 'I intercepted the request',
            'body'    : 'And this is the message of love I am bringing to you <3',
            'author'  : 'Gavin King',
            'avatar'  : 'gavin'
        }]
    });

    // NOTE: the `respondWith` method is on the `event` object. It requires a `Response` object
    // or a Promise that resolves to a Response object.
    event.respondWith(new Response(myNews));
});
