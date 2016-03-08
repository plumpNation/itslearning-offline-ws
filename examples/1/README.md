Example 1
=========

## What is in the page?
1. A list of hardcoded news articles.
2. A CSS import.
3. A javascript file that outputs a simple console.info message.
4. A section containing news articles. Each article contains a
 * heading
 * *created at* datetime.

## What to do
1. Serve the example1.html page from your webserver in your browser (Firefox or Chrome?).
2. Use service workers to load the page and static assets.

## Service workers
In production, service workers can only be loaded by https, but since we are working on localhost,
we are forgiven and can continue to develop on http.

### Debugging service workers
In Chrome, open 'Developer Tools'->'Resources'->'Service Workers' to see the status of service
workers loaded in your browser.

To see what your browser has stored from other websites, take a look at chrome://serviceworker-internals.

## Trouble shooting
If your assets are not loading, please check the README in the root folder and check that your
webserver is running.

You will need to ensure that the paths to the static assets (css, js) are correct.

If you see an error in your network tab (ERR_FILE_EXISTS) for the service worker, don't worry.
[This patch](https://bugs.chromium.org/p/chromium/issues/detail?id=541797) will remove that noise,
you shouldn't experience any issues.
