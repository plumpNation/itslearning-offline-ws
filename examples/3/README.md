Online detection and events
===========================

This should be example 2

```javascript
// If you just want to know if you are online right now
var state = navigator.onLine ? 'online' : 'offline';

alert('you are currently ' + state);

// Using listeners is really useful, since you can inform a user immediately
window.addEventListener('offline', function (e) {
    alert('offline');
}, false);

window.addEventListener('online', function (e) {
    alert('online');
}, false);
```
