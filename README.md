# itslearning-offline-ws

## What the hell is going on in here?
If you have not been working with javascript or html for a while, some of the patterns in these
examples may look a little strange.

If you want to know more about some of these techniques, I have created a list of those patterns
here.

* [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
and more informally [this article](http://www.html5rocks.com/en/tutorials/es6/promises/).
* [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) and
[a more informal article](https://davidwalsh.name/fetch)
 * [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 * [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
* [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and
[Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
* [ServiceWorker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [Functional programming](https://www.smashingmagazine.com/2014/07/dont-be-scared-of-functional-programming/)
 * [Higher order functions](https://medium.com/humans-create-software/a-dirt-simple-introduction-to-higher-order-functions-in-javascript-b33bf9e19056#.dmal6ulvs)

## Requirements
I recommend that you use Chrome for this workshop. The READMEs will prioritise Chrome.

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
There is an instructional local README in each of the example folders.

- Basic offline detection.
- Introduction to ServiceWorkers and their lifecycle.
- ServiceWorkers: Interfering with requests.
- Introduction to the Cache API.
- Introduction to localforage?
- push notifications?
- The kitchen sink. An example of all the techniques used together.

## Trouble shooting
If your assets are not loading, please check the README in the root folder and check that your
webserver is running.

You will need to ensure that the paths to the static assets (css, js) are correct.

If you see an error in your network tab (ERR_FILE_EXISTS) for the service worker, don't worry.
[This patch](https://bugs.chromium.org/p/chromium/issues/detail?id=541797) will remove that noise,
you shouldn't experience any issues.

### Debugging service workers
In Chrome, open 'Developer Tools'->'Resources' and take a look at the different resources
available.

* Use 'Service Workers' to examine and inspect your service worker.
* Use 'Cache Storage' to examine the cache buckets and request/response pairs you are storing.

To see what your browser has stored about service workers:
* chrome://serviceworker-internals
* chrome://inspect/#service-workers

If you want to learn about the tooling in Firefox,
[take a look at this video](https://www.youtube.com/watch?v=1FWUYHxt5W4).
