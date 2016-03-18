from SimpleHTTPServer import SimpleHTTPRequestHandler
import SocketServer
import json
import logging
import sys

database = json.loads(open('database.json').read());

if sys.argv[1:]:
    port = int(sys.argv[1])
else:
    port = 8000

class Handler(SimpleHTTPRequestHandler):
    def sendDatabase(self):
        response = json.dumps(database)

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header("Content-length", len(response))
        self.end_headers()
        self.wfile.write(response)

    def do_GET(self):

        if (self.path.endswith('news.json')):
            self.sendDatabase()

        else:
            SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if (self.path.endswith('news.json')):
            database['news'].append({
                "headline": "This is your data",
                "body": "It comes from a flat file in the home folder",
                "author": "Gavin King",
                "avatar": "gavin"
            });

            self.sendDatabase()

        else:
            SimpleHTTPRequestHandler.do_GET(self)

SocketServer.TCPServer.allow_reuse_address=True
httpd = SocketServer.TCPServer(("0.0.0.0", port), Handler)

sa = httpd.socket.getsockname()

print "Serving HTTP on", sa[0], "port", sa[1], "..."

httpd.serve_forever()
