const version = 1,

    SWName  = `v${version}-background-sync`,

    // The files we want to cache
    whitelistURIs = [
        '/',
        'css/pure/pure-min.css',
        'css/pure/grids-responsive-min.css',
        'css/news.css',
        'css/components/network-indicator.css',
        'lib/helpers/news-helper.js',
        'lib/components/network-indicator.js',
        'lib/components/news-form.js',
        'app.js',

        'img/kingsman-logo.png',

        'img/avatars/gavin.png',
        'img/avatars/andrew.png',
        'img/avatars/ericf.png',
        'img/avatars/reid.png',
        'img/avatars/tilo.png',

        'news.json'
    ];

console.info('Executing service worker for', SWName);

self.importScripts('lib/dexie.js');

self.addEventListener('install', (event) => {
    let cachesAreWritten = function () {
        console.info('adding whitelist to cache');

        return caches
            .open(SWName)
            .then((cache) => cache.addAll(whitelistURIs));
    };

    console.info(SWName, 'installing');

    event.waitUntil(cachesAreWritten());
});

self.addEventListener('activate', (event) => {
    console.info(SWName, 'activating');

    Dexie.Promise.on('error', (err) => {
        console.error('Uncaught error:');
        console.error(err);

        throw new Error(err);
    });

    Dexie.exists(SWName)
        .then((exists) => {
            if (exists) {
                return;
            }

            createDB(SWName);
        });
});

self.addEventListener('fetch', (event) => {
    let path   = event.request.url,
        method = event.request.method;

    console.info(SWName, 'requesting', path);

    if (path.endsWith('news.json')) {
        switch (method) {
            case 'POST':
                writeToDB(event.request);
                break;

            case 'GET':
                let allNews = getAllFromDB()
                        .then(function (response) {
                            let json = JSON.stringify({'news': response});

                            return new Response(json);
                        });

                event.respondWith(allNews);
                break;
        }

        return;
    }

    if (inWhitelist(path)) {
        event.respondWith(fetchCachePriority(SWName, event.request));
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////  HELPERS  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function writeToDB() {
    let db = getDB(SWName);

    db.news.add();
}

function getAllFromDB() {
    let db = getDB(SWName);

    return db.news.toArray();
}

/**
 * @param  {string} requestURI
 * @return {boolean} true if the requestURI ends with anything in the whitelist.
 */
function inWhitelist(requestURI) {
    return whitelistURIs.some((whitelistURI) => {
        return requestURI.endsWith(whitelistURI);
    });
}

/**
 * Fetches a request, caches the response and returns the original response
 *
 * @param  {string} cacheName
 * @param  {Request} request
 * @return {Promise} A Promise that resolves to a Response object.
 */
function fetchCachePriority(cacheName, request) {
    let requestClone = request.clone();

    return caches.match(request)
        .then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetchAndCache(cacheName, requestClone);
        });

}

function fetchAndCache(cacheName, request) {
    return fetch(request)
        .then((response) => cacheResponse(cacheName, request, response));
}

/**
 * @param {string}   cacheName
 * @param {Request}  request
 * @param {Response} response
 */
function cacheResponse(cacheName, request, response) {
    // We need to clone the response too, as we will use it more than once.
    let responseClone = response.clone();

    console.info('Caching', request.url, 'in', cacheName);

    caches.open(cacheName)
        .then((cache) => cache.put(request, responseClone));

    return response;
}

function getDB(dbName) {
    console.info('setting up db', dbName);
    // Dexie.delete(dbName);

    let db = new Dexie(dbName);

    db.version(version)
        .stores({'news': 'id'});

    return db;
}

function createDB(dbName) {
    let db = getDB(dbName);

    db.open()
        .then(() => console.info(SWName, 'database created'))
        // .then(() => initData(db))
        // .then(() => console.info(SWName, 'initial data added to database'));
}

function initData(db) {
    console.info(SWName, 'initialising db with remote data');
    return fetch(new Request('news.json'))
        .then((response) => response.json())
        .then((json) => db.news.bulkAdd(json.news));
}
