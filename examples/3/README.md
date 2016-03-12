3. CacheAPI example
===================

## What's in the page?
* Simple HTML page
* Tiny application demonstrating the Cache API.

## How to test?

## Cache vs CacheStorage
These apis are totally related.

**CacheStorage** is the bucket, like localStorage.
Use `caches` to access it's API.

**Cache** is the individual key value cached item within the CacheStorage.
Use `cache` to access it's API.

## The Fetch API
Read about it [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API);

Request and Response are interfaces on the Fetch API
* [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
* [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

### It's not supported by crappy browsers
Correct, but it's nice to learn about it and it is a very simple tool.

### Cloning
If you are dealing with Request and Response objects, you may come across the 'already read' error.
They are streams, and can only be used once. Caching is an example of use. Converting to json is
another. Both of these are used in this example.

To resolve this issue, simply clone the stream to use it and only use the original to perform the
final action.

  response.clone()
