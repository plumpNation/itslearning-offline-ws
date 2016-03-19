(function () {
    'use strict';

    let dbName          = 'v1-indexeddb-example',
        dbVersion       = 1,
        objectStoreName = 'news';

    console.info('IndexedDB example: running');

    window.onload = init;

    let getAll = function (id) {
        let DBOpenRequest = indexedDB.open(dbName, dbVersion);

        DBOpenRequest.onsuccess = function (event) {
            let transaction = createTransaction(event.target.result),
                objectStore = transaction.objectStore(objectStoreName),
                request     = objectStore.getAll();

            request.onsuccess = function (event) {
                if (event.target.result.length) {
                    console.group('results from db:');
                    event.target.result.map((item) => console.log(item));
                    console.groupEnd();
                }
            };
        };
    };

    let getOne = function () {
        let DBOpenRequest = indexedDB.open(dbName, dbVersion);

        DBOpenRequest.onsuccess = function (event) {
            let transaction = createTransaction(event.target.result),
                objectStore = transaction.objectStore(objectStoreName),
                objectId    = parseInt(document.getElementById('id-to-get').value, 10),
                request     = objectStore.get(objectId);

            request.onsuccess = function (event) {
                console.log(event.target.result);
            };
        };
    };

    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('get-all').addEventListener('click', () => getAll());
        document.getElementById('get-one').addEventListener('click', () => getOne());
    });

    function init() {
        let DBOpenRequest = indexedDB.open(dbName, dbVersion);

        console.info('opening database');

        DBOpenRequest.onsuccess       = onDBOpenSuccess;
        DBOpenRequest.onupgradeneeded = onDBUpgradeNeeded;

        // DBOpenRequest.onerror         = onDBOpenError;
    };

    function onDBOpenSuccess(event) {
        console.info('Database', '"' + dbName + '"', 'version', dbVersion, 'initialised');

        addData(event.target.result);
    };

    // Change the Database structure
    function onDBUpgradeNeeded(event) {
        let objectStore,
            db = event.target.result;

        db.onerror = (event) => console.error('Error loading database');

        setupObjectStore(db);

        console.info('database upgraded to', dbVersion);
    };

    function setupObjectStore(db) {
        if (!db.objectStoreNames.contains(objectStoreName)) {
            let objectStore = db.createObjectStore(objectStoreName, {'keyPath': 'id'});

            console.info('Object store created');
            createIndexes(objectStore);
        }
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
                let transaction = createTransaction(db),
                    objectStore = transaction.objectStore(objectStoreName);

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
}());
