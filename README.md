itslearning offline workshop
============================

Before you start, you should know that this set of examples is meant to be a starting point and
not an exhaustive solution to all your online woes.

It will cover a few technologies that are associated with newer browser technologies that can be
put to use to provide a user with a better offline experience and less network traffic by utilising
different techniques and APIs.

Not all of these techniques are available in all browsers at this time, so for now, use Chrome.

This was developed on top of Chrome 49. I would use that version or higher for the time being.

**Always have your console open and your cache turned off.**

## What the hell is going on in here?
If you have not been working with javascript for a while, some of the code or patterns in these
examples may look a little strange.

If you want to know more about some of these techniques, I have been trying to update a list of
those items here, so when you come across something that is weird or you've not seen before, you
can come here to check if I've been thorough.

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

## Requirements
You should have a local web server set up, maybe

* Apache
* Nginx
* [Python server](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python)

I recommend the Python server, it's cross platform, is easy to install (comes with python),
requires no configuration and gives a nice console output to watch.

```shell
# This command serves the current directory on 0.0.0.0:8000
python -m SimpleHTTPServer 8000
```

You can access the served directory at localhost:8000 or 127.0.0.1:8000 to browse the examples.

You can use **localhost** to develop service workers locally on http, unless you have a valid TLS
certificate for the domain.

## Setup
1. Clone repo and createa new git working branch.
2. Open in your favourite web editor (for HTML, CSS, javascript).
3. Ensure your webserver is serving the directory.
4. Browse to localhost:8000

You may get a message telling you that a script couldn't find service worker compatibility in your
current browser. Download the latest Chrome and you should be fine.

## Learning instructions
There is a local README in each of the example folders. You should read that.

### Subjects covered

- Basic offline detection.
- Introduction to ServiceWorkers and their lifecycle.
- ServiceWorkers
 - Interfering with requests.
 - Caching and returning offline content
- Introduction to the Cache API.
 - Write a request response key value pair to the Cache.
 - Check if cache exists for a request
- Introduction to IndexedDB

## Trouble shooting
### Page is not loading
Please check that your webserver is running in the root directory, that's this one, and that the
uri you are using in the browser address bar is correct e.g. http://localhost:8000/examples/0 .

### ERR_FILE_EXISTS
If you see this error in your console or network tab (ERR_FILE_EXISTS) for the service worker, don't
worry. [This patch](https://bugs.chromium.org/p/chromium/issues/detail?id=541797) will remove that
noise, you shouldn't experience any issues.

### Debugging service workers
In Chrome, open 'Developer Tools'->'Resources' and take a look at the different resources
available.

* Use 'Service Workers' to examine and inspect your service worker.
* Use 'Cache Storage' to examine the cache buckets and request/response pairs you are storing.

To see what your browser has stored about service workers:
* chrome://serviceworker-internals
* chrome://inspect/#service-workers

If you want to learn about the tooling in Firefox,
[take a look at this video](https://www.youtube.com/watch?v=1FWUYHxt5W4) and read [this article](https://hacks.mozilla.org/2016/03/debugging-service-workers-and-push-with-firefox-devtools/).

## Other important things to consider
Even if can make a good browser offline experience, should we? What if a computer is a shared
resource?

### Storage capacity in the browser
Filling up a browser with locally stored assets and data is not to be taken lightly.

It is essential to find out more about browser
[storage limits and eviction rules](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)
in order to understand the effect it will have on your application.

### Security of locally stored data
Moreover, there are important security implications when storing a users data in the browser and so
some form of encryption. An [older article here](https://tonyarcieri.com/whats-wrong-with-webcrypto)
should ensure you that it is not a good idea to do encryption in the browser.

Using the SessionStorage is another way of ensuring that locally cached data will not be available
should the browser tab close.


### So, we can't use it?
Regardless of the valid technical issues stated in this section, it doesn't mean there is no offline
future worth discussing.

Product decisions can help circumvent them, for instance, by asking the
user to opt in to offline storage, and warning them that their device must be private, used only
by them.

Making it easy for someone to remove all traces of offline data would also be something to look
into.
