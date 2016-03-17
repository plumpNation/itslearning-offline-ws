(function () {
    'use strict';

    let dbName          = 'offline-example-db',
        dbVersion       = 1,
        objectStoreName = 'news';

    console.info('IndexedDB example: running');

    window.onload = init;

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
