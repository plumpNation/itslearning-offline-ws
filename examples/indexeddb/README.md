5. IndexedDB, the browser database
==================================

A basic example of how to work with IndexedDB.

## Before you start
When you're working in this example, open your chrome://settings and click the
'Show advanced settings...'.

When you want to clear out your IndexedDB completely, simply click `Clear browsing data...`
and make sure that the checkbox for `Cookies and other site and plugin data` is selected.

The shortcut for this is CTRL + SHIFT + DELETE. Mac users please make a pull request :)

If you want to read about the basic concepts behind IndexedDB, you should
[start here](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB).

## What is in the folder?
1. An HTML page to load the example.
2. An application to create and populate an IndexedDB.
3. A data.json file containing some terribly bad news.

## Nice to know about IndexedDB
* A database is versioned.
* Adding another version
* There are still differences between different browser vendors implementations, but they are
aligning.
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
