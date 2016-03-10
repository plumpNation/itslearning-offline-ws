Example 2
=========

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
3. Stop the web server.
4. Refresh the browser page.

The example is now loading from the CacheStorage, except the styles as they were not included in
the caching whitelist.
