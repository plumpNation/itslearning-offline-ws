(function (indexedDB) {
    let root = window || self;

    IDBHelper.prototype.getAll = function (id) {
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


}(indexedDB));
