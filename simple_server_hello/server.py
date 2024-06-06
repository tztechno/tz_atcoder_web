# python server.py
# http://127.0.0.1:8000/

from http.server import SimpleHTTPRequestHandler, HTTPServer

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(b"Hello, Python World!")

server = HTTPServer(('localhost', 8000), MyHandler)
server.serve_forever()
