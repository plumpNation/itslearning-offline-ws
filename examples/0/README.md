0. Offline detection
===============================

## What is in the page?
1. A CSS file.
3. A javascript file.
4. Some arbitrary HTML.

## What to do

1. install  - The service worker file is downloaded and the code in the install callback is run.
2. activate - This is the first service worker or it has been updated.
3. fetch    - A request was made, and the service worker heard it.

We will be using the Chrome debugging tools.

#### The console
1. Open the Resource tab -> Service Workers view and take a look at your worker.
 * Open a console for your Service Worker.
2. Refresh the page.
 * The Service Worker logs are now limited to it's own console

If a console is not open for the Service Worker, it's logs will go to the browser console.

#### Original
1. Open a new browser tab.
2. Open the developer tools.
3. Open examples/1 in the browser.
4. Observe the console information.
 * Installation
 * Activation
5. Refresh the page
6. Observe again.
 * Fetching

#### After alteration
1. Open the Resource tab -> Service Workers view and take a look at your worker.
 * Open a console for your Service Worker.
2. Refresh the page.
 * The Service Worker logs are now limited to it's own console

2. Modify the version number.
3. Refresh the browser.

1. View example1.html page (running in your local webserver) in the browser.
2. Use service workers to cache the page assets to make them available offline.
3. Use the Resource tab to observe the service worker and cache storage.
4. Intercept network requests for the assets and serve from the cache if they exist.
5. Learn about cloning network requests and why you need to do them.
6. Make a change in the service worker.
 * Watch the state of that worker go Installed -> Waiting
 * Make a listener for the activate event.
 * Close the page.
 * Look for the activate event logging.













## Service workers
In production, service workers can only be loaded by https, but since we are working on localhost,
we are forgiven and can continue to develop on http.

## Trouble shooting
If your assets are not loading, please check the README in the root folder and check that your
webserver is running.

You will need to ensure that the paths to the static assets (css, js) are correct.

If you see an error in your network tab (ERR_FILE_EXISTS) for the service worker, don't worry.
[This patch](https://bugs.chromium.org/p/chromium/issues/detail?id=541797) will remove that noise,
you shouldn't experience any issues.
