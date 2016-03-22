let version = 'v1-service-worker-lifecycle';

console.info('Executing service worker for', version);

/**
 * `install` is dispatched when the serviceWorker is downloaded.
 * The callback can utilise the event.waitUntil(Promise) to ensure installation logic
 * completes before the serviceWorker is ready for activation.
 */
self.addEventListener('install', (event) => {
    console.info(version, 'installing');

    // event.waitUntil(Promise);
});

/**
 * `activate` is dispatched when the serviceWorker is installed and is the first serviceWorker
 * created for the page, or is ready to take over from the previous one.
 * The callback can utilise the event.waitUntil(Promise) to ensure installation logic
 * completes before the serviceWorker is ready to become active.
 */
self.addEventListener('activate', (event) => {
    console.info(version, 'activating');

    // event.waitUntil(Promise);
});

/**
 * The `fetch` event is fired whenever a network request is made by the browser.
 * This is where you can add code to examine the request and make a decision on what you want to
 * respond with.
 * If you don't call event.respondWith() then the default browser behaviour will occur.
 */
self.addEventListener('fetch', (event) => {
    console.info(version, 'requesting', event.request.url);

    // event.respondWith(Promise || Promise resolving to Response);
});
