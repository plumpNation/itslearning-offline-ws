from SimpleHTTPServer import SimpleHTTPRequestHandler
import SocketServer
import json
import sys
from urlparse import parse_qs

database = json.loads(open('fixture.json').read());

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

            self.data_string = self.rfile.read(int(self.headers['Content-Length']))

            data = json.loads(self.data_string)

            database['news'].insert(0, data);

            self.sendDatabaseJSON()

        else:
            SimpleHTTPRequestHandler.do_GET(self)

SocketServer.TCPServer.allow_reuse_address=True
httpd = SocketServer.TCPServer(('0.0.0.0', port), Handler)

sa = httpd.socket.getsockname()

print 'Serving HTTP on', sa[0], 'port', sa[1], '...'

httpd.serve_forever()
