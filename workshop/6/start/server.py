from SimpleHTTPServer import SimpleHTTPRequestHandler
import SocketServer
import json
import logging
import sys
from urlparse import parse_qs

database = json.loads(open('database.json').read());

if sys.argv[1:]:
    port = int(sys.argv[1])
else:
    port = 8000

class Handler(SimpleHTTPRequestHandler):
    def sendDatabaseJSON(self):
        response = json.dumps(database)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Content-length', len(response))
        self.end_headers()
        self.wfile.write(response)

    def do_GET(self):

        if (self.path.endswith('news.json')):
            self.sendDatabaseJSON()

        else:
            SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if (self.path.endswith('news.json')):

            length = int(self.headers['content-length'])
            postvars = parse_qs(self.rfile.read(length), keep_blank_values=1)

            database['news'].insert(0, {
                'headline': postvars['headline'][0],
                'body': postvars['body'][0],
                'author': postvars['author'][0],
                'avatar': postvars['avatar'][0]
            });

            self.sendDatabaseJSON()

        else:
            SimpleHTTPRequestHandler.do_GET(self)

SocketServer.TCPServer.allow_reuse_address=True
httpd = SocketServer.TCPServer(('0.0.0.0', port), Handler)

sa = httpd.socket.getsockname()

print 'Serving HTTP on', sa[0], 'port', sa[1], '...'

httpd.serve_forever()
