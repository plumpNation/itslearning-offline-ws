(function () {
    'use strict';

    let db,
        dbName          = 'v1-dexie-example',
        objectStoreName = 'news',
        dbVersion       = 1;

    console.info('Dexie example: running');

    window.onload = init;

    setupUI();

    function init() {
        Dexie.Promise.on('error', (err) => console.error('Uncaught error:', err));

        Dexie.exists(dbName)
            .then((exists) => {
                if (exists) {
                    setupDB(dbName);
                    return;
                }

                createDB(dbName)
            });
    };

    function setupDB(dbName) {
        db = new Dexie(dbName);

        db.version(dbVersion)
            .stores({
                // the first item in the csv is the keyPath
                'news': 'id'
            });
    }

    function createDB(dbName) {
        setupDB(dbName);

        db.open()
            .then(() => console.info('database created'))
            .then(() => initData(db))
            .then(() => console.info('initial data added to database'));
    }

    function initData(db) {
        return fetch(new Request('./data.json'))
            .then((response) => response.json())
            .then((json) => db.news.bulkAdd(json.news));
    }

    function setupUI() {
        window.addEventListener('DOMContentLoaded', () => {
            document.getElementById('delete-db').addEventListener('click', () => deleteDB(dbName));

            document.getElementById('get-all').addEventListener('click', () => getAll());

            document.getElementById('get-one').addEventListener('click', () => {
                let objectId = parseInt(document.getElementById('id-to-get').value, 10);

                getOne(objectId);
            });
        });
    }

    function deleteDB(dbName) {
        Dexie.delete(dbName)
            .then(() => console.info(dbName, 'deleted'));
    }

    function getAll() {
        console.group('News items:');
        db.news.each((result) => console.log(result));
        console.groupEnd();
    };

    function getOne(objectId) {
        db.news.get(objectId)
            .then((result) => console.log(result));
    };

}());
