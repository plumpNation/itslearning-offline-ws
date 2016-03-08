# itslearning-offline-ws

## Requirements
You should have a local web server set up, maybe

* Apache
* Nginx
* [Python server](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python)

I recommend the Python server, it's cross platform, is easy to install (comes with python),
requires no configuration and gives a nice console output to watch.

```shell
# This command serves the current directory on 0.0.0.0:8000
python -m SimpleHTTPServer
```

You can access the served directory at localhost:8000 or 127.0.0.1:8000 to browse the examples.

The workshop files are loading assets from localhost:8000, so if you need to change this for any
reason, be aware that you will need to update the script and link tags.

## Setup
1. Clone repo and createa new git working branch.
2. Open in your favourite web editor (for HTML, CSS, javascript).
3. Ensure your webserver is serving the directory.
4. Browse to localhost:8000

## Follow along
There is an instructional local README in each of the example folders.
