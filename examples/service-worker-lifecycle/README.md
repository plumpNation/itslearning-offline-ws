ServiceWorker Lifecycle
=======================

## What is in the folder?
1. An application script to register the ServiceWorker.
2. A service worker containing listeners for the basic events.
3. A basic HTML page to load the example.

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
Open DT:Resources->Service Workers view and take a look at your worker.
 * Open a console for your ServiceWorker by clicking 'inspect'.

If a console is not open for the ServiceWorker, it's logs will go to the browser console.

## To test
1. Open a new browser tab.
2. Open the developer tools 'Resource' tab.
3. Open `examples/service-worker-lifecycle` in the browser.
 * You should see the service worker in the 'active' tab under ServiceWorkers now.
4. Click the 'inspect' link in the service worker info.
5. Observe the console information.
 * Installation
 * Activation
6. Refresh the page
7. Observe again.
 * Fetching

If you make a change in the service worker now, without causing an error and refresh the page
you will see (in the 'Resource' tab) that the original service worker is still handling the
requests, calling it's fetch callback.

The modified service worker is sat in the 'waiting' tab, and will not activate until the tab closes
or the service worker is manually deleted in the developer tools.
