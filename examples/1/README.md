Example 1
=========

This file needs to be broken down into simpler exercises, but for now, I'm lumping it all together.

## What is in the page?
1. A list of hardcoded news articles.
2. A CSS import.
3. A javascript file that outputs a simple console.info message.
4. A section containing news articles. Each article contains a
 * heading
 * *created at* datetime.

## What to do

### Life cycle

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

### Debugging service workers
In Chrome, open 'Developer Tools'->'Resources' and take a look at the different resources
available.

* Use 'Service Workers' to work with your service worker.
 * If you want to see only the logs from the service worker, click `inspect`.
* Use 'Cache Storage' to examine the files the service worker is caching.

To see what your browser has stored from other websites, take a look at chrome://serviceworker-internals.

## Trouble shooting
If your assets are not loading, please check the README in the root folder and check that your
webserver is running.

You will need to ensure that the paths to the static assets (css, js) are correct.

If you see an error in your network tab (ERR_FILE_EXISTS) for the service worker, don't worry.
[This patch](https://bugs.chromium.org/p/chromium/issues/detail?id=541797) will remove that noise,
you shouldn't experience any issues.
