# python server.py
# http://127.0.0.1:8000/
#/my_project
#    index.html
#    server.py

from http.server import SimpleHTTPRequestHandler, HTTPServer

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = 'index.html'
        return SimpleHTTPRequestHandler.do_GET(self)

server = HTTPServer(('localhost', 8000), MyHandler)
print("Server started at http://localhost:8000")
server.serve_forever()