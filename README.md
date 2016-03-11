# itslearning-offline-ws

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

### 0
Basic offline detection

### 1
Introduction to ServiceWorkers

### 2
Introduction to Cache API

### 3
Introduction to localforage?

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
* Use 'Cache Storage' to examine the cache trees and files you are storing.

To see what your browser has stored about service workers:
* chrome://serviceworker-internals
* chrome://inspect/#service-workers
