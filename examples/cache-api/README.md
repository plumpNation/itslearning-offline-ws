CacheAPI example
===================

## What's in the folder?
* Simple HTML page
* Tiny application demonstrating the Fetch and CacheStorage API.
* A json fixture that we will request and cache.

## How to test?
1. Load the page.
2. Change the data.json `body` text.
3. Refresh the page.
4. What! It hasn't changed.
5. Check the server logs.
6. What! No request was sent.
7. Show the person next to you how amazed you are.
8. Get excited about the fine level control you now have over caching in the browser.
9. Cache all the things, get confused, stop being so excited.
10. Be more realistic about what to cache.

## Cache vs CacheStorage
These apis are totally related to this. I shit you not.

**CacheStorage** is the bucket, like localStorage.
Use global `caches` to access it's API in the console.

**Cache** is the individual key value cached item within the CacheStorage.
Return a Cache Object from the `caches.open` method.

A really basic example of cache usage is as follows.

```javascript
// Create a CacheStorage called `example`
caches.open('example')
    .then(function (cache) {
        // Creates a cache key `http://localhost:8000/examples/2/test`
        cache.put('test',
            // with the foobar gazonk response as it's value
            new Response('Foobar Gazonk'));
    });
```

## The Fetch API
Read about it [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API);

Request and Response are interfaces on the Fetch API
* [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
* [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

### Cloning
If you are dealing with Request and Response objects, you may come across the 'already read' error.
They are streams, and can only be used once. Caching is an example of use. Converting to json is
another. Both of these are used in this example.

To resolve this issue, simply clone the stream to use it and only use the original to perform the
final action.

  response.clone()
