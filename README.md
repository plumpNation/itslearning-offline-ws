# itslearning-offline-ws

## HTTPS server included
HTTPS is required for using one of the technologies we will learn about, Service Workers.

Included is a simple python https server, it's cross platform, is easy to use.

```shell
# This command serves the current directory on https://localhost:8000
python server/run.py
```

The workshop files are loading assets from https://localhost:8000, so if you need to change this
for any reason, be aware that you will need to update the script and link tags in the example files.

## Setup
1. Clone repo and createa new git working branch.
2. Open in your favourite web editor (for HTML, CSS, javascript).
3. Ensure your webserver is serving the directory.
4. Browse to https://localhost:8000

If you get an alert and a console warning that your browser doesn't support service workers, please
download the latest version of Chrome or Firefox.

## Follow along
There is an instructional local README in each of the example folders.
