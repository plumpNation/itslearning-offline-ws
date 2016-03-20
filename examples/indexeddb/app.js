(function () {
    'use strict';

    let dbName          = 'v1-indexeddb-example',
        dbVersion       = 1,
        objectStoreName = 'news';

    console.info('IndexedDB example: running');

    window.onload = init;

    setupUI();

    function init() {
        let DBOpenRequest = indexedDB.open(dbName, dbVersion);

        console.info('opening database');

        DBOpenRequest.onsuccess       = onDBOpenSuccess;
        DBOpenRequest.onupgradeneeded = onDBUpgradeNeeded;

        // DBOpenRequest.onerror      = onDBOpenError;
    };

    function onDBOpenSuccess(event) {
        console.info('Database', '"' + dbName + '"', 'version', dbVersion, 'initialised');

        addData(event.target.result);
    };

    /**
     * This is called when the db version has changed, and allows us to perform cleanup and
     * migration tasks.
     */
    function onDBUpgradeNeeded(event) {
        let db = event.target.result;

        db.onerror = (event) => console.error('Error loading database');

        setupObjectStore(db);

        console.info('database upgraded to', dbVersion);
    };

    function setupObjectStore(db) {
        if (db.objectStoreNames.contains(objectStoreName)) {
            return;
        }

        let objectStore = db.createObjectStore(objectStoreName, {'keyPath': 'id'});

        console.info('Object store created');

        createIndexes(objectStore);
    }

    function createIndexes(objectStore) {
        let indexes = [
            {
                'name'   : 'by_author',
                'field'  : 'author',
                'options': {'unique': false}
            }
        ];

        indexes.forEach((index) => objectStore.createIndex(index.name, index.field, index.options));

        console.info('Indexes created');
    }

    function addData(db, clearFirst) {
        console.info('Loading data.json');

        fetch(new Request('./data.json'))
            .then((response) => response.json())
            .then((json) => {
                let objectStore = getObjectStore(db, objectStoreName);

                console.info('data.json loaded');

                if (clearFirst) {
                    console.info('Clearing existing store');
                    objectStore.clear();
                }

                json.news.forEach((newsItem) => objectStore.put(newsItem));
                console.info('Data updated in database');
            })
            .catch((err) => console.error(err));
    }

    /**
     * This has hardcoded scope etc, so it will only work in this example.
     */
    function createTransaction(db) {
        let transaction,
            transactionScope = [objectStoreName];

        transaction = db.transaction(transactionScope, 'readwrite');

        transaction.oncomplete = (event) => console.info('Completed transaction');
        transaction.onerror    = (err)   => console.error(err);

        return transaction;
    }

    function getObjectStore(db, objectStoreName) {
        let transaction = createTransaction(db),
            objectStore = transaction.objectStore(objectStoreName);

        return objectStore;
    }

    function getAll() {
        let DBOpenRequest = indexedDB.open(dbName, dbVersion);

        DBOpenRequest.onsuccess = function (event) {
            let db      = event.target.result,
                request = getObjectStore(event.target.result, objectStoreName).getAll();

            request.onsuccess = function (event) {
                if (!event.target.result.length) {
                    console.warn('no results found');
                    return;
                }

                console.group('results from db:');
                event.target.result.map((item) => console.log(item));
                console.groupEnd();
            };
        };
    }

    function getOne(objectId) {
        let DBOpenRequest = indexedDB.open(dbName, dbVersion);

        DBOpenRequest.onsuccess = function (event) {
            let db      = event.target.result,
                request = getObjectStore(db, objectStoreName).get(objectId);

            request.onsuccess = function (event) {
                console.log(event.target.result);
            };
        };
    }

    function setupUI() {
        window.addEventListener('DOMContentLoaded', () => {
            console.info('setting up UI listeners');
            document.getElementById('get-all').addEventListener('click', () => getAll());
            document.getElementById('get-one').addEventListener('click', (event) => {
                let objectId = parseInt(document.getElementById('id-to-get').value, 10);

                getOne(objectId);
            });
        });
    }
}());
