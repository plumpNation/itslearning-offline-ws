1. ServiceWorker API
===============================

## What is in the page?
1. A list of hardcoded news articles.
2. A CSS file.
3. A javascript file.
4. Some arbitrary HTML.

## What is this section about?
This section is about acquainting yourself with the basic ServiceWorker lifecycle, events and
tooling (in Chrome). There is a small section on debugging ServiceWorkers in the developer tools in
the README found on the root.

If you see **DT**:somethingblabla, the DT stands for **Developer Tools** and refers to the Chrome
developer tools that contain the javascript console, network tab, resources tab etc.

If you want to learn about the tooling in Firefox,
[take a look at this video](https://www.youtube.com/watch?v=1FWUYHxt5W4).

## The Lifecycle of the API

The main lifecycle of a service worker is:

1. The service worker file is downloaded
2. The service worker is installed in the browser.
3. The service worker is activated if it is different to the one already stored, or is the first
service worker for the scope.

## The ServiceWorker events
* install  - a new or modified script is downloaded and installed.
* activate - a new or modified script is now ready to use.
* fetch    - A request was made, and the service worker heard it.

## The console
1. Open DT:Resources->Service Workers view and take a look at your worker.
 * Open a console for your ServiceWorker.
2. Refresh the page.
 * The ServiceWorker logs are now limited to it's own console

If a console is not open for the ServiceWorker, it's logs will go to the browser console.

## Original
1. Open a new browser tab.
2. Open the developer tools.
3. Open examples/1 in the browser.
4. Observe the console information.
 * Installation
 * Activation
5. Refresh the page
6. Observe again.
 * Fetching

## After alteration
1. Open DT:Resources->Service Workers view and take a look at your worker.
 * Open a console for your ServiceWorker.
2. Refresh the page.
 * The ServiceWorker logs are now limited to it's own console

3. Modify the version number.
4. Refresh the browser.

1. View example1.html page (running in your local webserver) in the browser.
2. Use service workers to cache the page assets to make them available offline.
3. Use DT:Resources->Service Worker to observe the service worker and cache storage.
4. Intercept network requests for the assets and serve from the cache if they exist.
5. Learn about cloning network requests and why you need to do them.
6. Make a change in the service worker.
 * Watch the state of that worker go Installed->Waiting
 * Make a listener for the activate event.
 * Close the page.
 * Look for the activate event logging.
