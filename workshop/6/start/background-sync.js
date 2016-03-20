(function (window) {
    'use strict';

    function BackgroundSync(item) {
        this.worker = new Worker('lib/workers/background-sync-worker.js');

        this.worker.postMessage('news', item);
    }

    BackgroundSync.prototype.sync = function () {
        console.info('Synching');
    };

    window.BackgroundSync = BackgroundSync;
}(window));
