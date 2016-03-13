5. IndexedDB, the browser database
==================================

A basic example of how to work with IndexedDB.

## What is in the folder?
1. An HTML page to load the example.
2. An application to create and
3.

## Nice to know about IndexedDB
* There are two main types of IndexedDB, `persistent` and `temporary`.
* A database can be versioned.
* It's quite complicated to use. There are some very simple wrapper libraries that allow you
to get up and running straight away, like
 * [dexie](http://dexie.org/)
 * [localforage](https://mozilla.github.io/localForage/)<br>
 *localforage also includes polyfills to allow faking IndexedDB with localStorage.*<br>
 I would really recommend one of these, because they take care of any APIs still in flux.

I found that
[documentation from the horse's mouth](https://w3c.github.io/IndexedDB/)
was the best I could find. Tutorials were out of date quickly and the browser differences seem
to still be present.

## Basic lifecycle

### Brand new database
1. Open a database.
2. Create object store.
3. Create index.
4. Use database.

### New version of existing database
1. Open a database.
2. Perform 'upgrade', add/remove indexes etc.
3. Use database.
