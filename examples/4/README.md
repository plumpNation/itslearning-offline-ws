4. CacheStorage and ServiceWorker: Offline fallback to basic template
=====================================

A basic example of how to serve offline content that is precached when the user installs
a ServiceWorker.

## What is in the folder?
1. An HTML page to load the example.
2. An offline html page to return if server cannot be contacted.
3. An application to register the service worker.
4. A service worker to set up the offline.html in the cache and return it if needed.

## What to do
1. Start the server.
2. Open a browser tab.
3. Stop the server.
4. Refresh the browser tab.
5. You should see the offline.html in the browser.
