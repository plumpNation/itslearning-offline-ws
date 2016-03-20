5. Dexie, the IndexedDB wrapper
===============================

A basic example of how to work with Dexie, a wrapper around IndexedDB.

It's so much nicer to work with.

## Before you start
When you're working in this example, open your chrome://settings and click the
'Show advanced settings...'.

When you want to clear out your IndexedDB completely, simply click `Clear browsing data...`
and make sure that the checkbox for `Cookies and other site and plugin data` is selected.

The shortcut for this is CTRL + SHIFT + DELETE. Mac users please make a pull request :)

There is a pretty good API reference [here](https://github.com/dfahlander/Dexie.js/wiki/API-Reference).

## What is in the folder?
1. An HTML page to load the example.
2. An application to create and populate an IndexedDB using Dexie.
3. A data.json file containing some terribly bad news.

## Nice to know about Dexie
* It's promise based, so keeps in context with the service worker and fetch api.
* Greatly simplifies usage of IndexedDB.

I found that the examples were a little short, and nowhere did it say that to connect to an
existing db you still need to use the .version() method when your page bootstraps.

## Basic lifecycle
1. Open a database.
2. Specify options including version and schema.
3. Use database.
