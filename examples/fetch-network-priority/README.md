Kitchen sink
============

## What is in the page?
1. A list of hardcoded news articles.
2. A CSS import.
3. A javascript file that registers a ServiceWorker life cycle to allow the page to be viewed
offline.
4. A section containing news articles. Each article contains a
 * heading
 * *created at* datetime.

## What to do
1. Start the web server.
2. Open the example in the browser and open the console for both the page and the ServiceWorker.
3. Stop the web server AND disconnect from network.
4. Observe that the page title is now red, reflecting your offline status.
5. Refresh the browser page.
6. Your application is now retrieving assets from the CacheStorage.

The example is now loading from the CacheStorage, except the styles as they were not included in
the caching whitelist.
