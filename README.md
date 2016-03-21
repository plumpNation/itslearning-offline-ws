itslearning offline workshop
============================

## Requirements

### Chrome
**Chrome 49+.** If you have not restarted your Chrome in a while, you may not have it.
Chrome *Settings > About* will tell you the version you are running.

**Always have your console open and your cache turned off.** It is best to deal with one layer of
caching at a time ;)

### A web server
Even if you have a local web server set up I would advise to use the python simple server.

It's cross platform, is easy to install (comes with python), requires no configuration and gives a
nice console output to watch.

Of course, it is up to you. I'm sure NGinx and Apache will be fine too.

#### Download python
If you are on Windows, you may need to install Python.

https://www.python.org/downloads/windows/

You can use Python 2 or 3, it doesn't matter. Instructions for both are included below.

**When you install, please remember to tick the box 'Add to PATH'.**

#### Running the Python server
Run this command in the root folder of this repository so that your service worker url changes when
you open a different folder.

```shell
# This command serves the current directory on 0.0.0.0:8000 in python 2
python -m SimpleHTTPServer 8000

# and for python 3
python3 -m http.server 8000
```

You can access the served directory at localhost:8000.

You must use **localhost** in Chrome if you do not wish to use https to run service-workers.

## Setup
1. Clone repo and create a new git working branch.
2. Open in your favourite web editor (for HTML, CSS, javascript).
3. Start the python server
4. Ensure your webserver is serving the root directory.
5. Browse to localhost:8000

## Learning instructions
There is a local README in each of the example folders.

jQuery has been included in the workshop folder if you prefer to work with it.

### Subjects covered
- Basic offline detection.
- Introduction to ServiceWorkers and their lifecycle.
- ServiceWorkers
 - Intercepting requests.
 - Installing offline content into the cache.
 - Responding to network requests with cached content.
- Introduction to the Cache API.
 - Write a request response key value pair to the Cache.
 - Check if cache exists for a request

## This code doesn't look like javascript
If you have not been working with javascript for a while, some of the code or patterns in these
examples may look strange.

If you want to know more about some of these techniques, I have been trying to update a list of
those items here, so when you come across something that is weird or you've not seen before, you
can come here to look it up.

* [Console API](https://developer.chrome.com/devtools/docs/console-api)
* [let](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let)
example: `let peace = 'beWithYou'`
* [Arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
example: `(foobar) => someCode(foobar)`
* [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
and more informally [this article](http://www.html5rocks.com/en/tutorials/es6/promises/).
* [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) and
[a more informal article](https://davidwalsh.name/fetch)
 * [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 * [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
* [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and
[Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
* [ServiceWorker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
* [Functional programming](https://www.smashingmagazine.com/2014/07/dont-be-scared-of-functional-programming/)
 * [Higher order functions](https://medium.com/humans-create-software/a-dirt-simple-introduction-to-higher-order-functions-in-javascript-b33bf9e19056#.dmal6ulvs)

## Trouble shooting
### Page is not loading
Please check that your webserver is running in the root directory, that's the directory this README
is in, and that the url you are using in the browser address bar is correct.
e.g. http://localhost:8000/workshop/0/start

### ERR_FILE_EXISTS
If you see this error in your console or network tab for the service worker, don't
worry.

[This patch](https://bugs.chromium.org/p/chromium/issues/detail?id=541797) will remove that
noise, you shouldn't experience any issues.

### Uncaught (in promise) SyntaxError: Unexpected token o
Make sure you stringify any objects you wish to use in a response.

```javascript
let responseData = JSON.stringify({}),
    response = new Response(responseData);

event.respondWith(response);
```

### Debugging
In Chrome, open 'Developer Tools'->'Resources' and take a look at the different resources
available.

* Use 'Service Workers' to examine and inspect your service worker.
* Use 'Cache Storage' to examine the cache buckets and request/response pairs you are storing.
