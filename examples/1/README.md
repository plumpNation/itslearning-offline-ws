1. ServiceWorker API
===============================

## What is in the page?
1. A CSS file.
2. An application script.
3. A service worker containing listeners for the basic events.
4. A basic HTML page to load the example.

## What is this section about?
This section is about acquainting yourself with the basic ServiceWorker lifecycle, events and
tooling (in Chrome). There is a small section on debugging ServiceWorkers in the developer tools in
the README found on the root.

## The Lifecycle of the API

The main lifecycle of a service worker is:

1. The service worker file is downloaded on page load.
2. The service worker is installed and activated.
3. It listens for requests.

Once a service worker is installed there is a difference:

1. A new service worker file is downloaded on page load.
2. The new service worker is installed.
2. The previous service worker is still installed, so the new service worker takes the 'waiting'
position.
3. The old service worker still handles requests.
4. When the tab is closed, the new service worker is activated.
5. On subsequent visits, the new service worker handles all requests.

**This `waiting` stage can be overridden to get instant update.** It is called immediate claim and
there is an [easy example](https://serviceworke.rs/immediate-claim.html) in the
[mozilla service workers cookbook](https://serviceworke.rs/).

```javascript
self.skipWaiting();
```

### installing
The service worker is downloaded into the browser, parsed and executed.

### waiting
A previously installed service worker is still in charge of handling requests.

### active
The service worker handles requests, any old versions are now gone. This is where you can make
changes that were breaking in older versions, remove old caches etc.

### redundant
The service worker installation failed.

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
