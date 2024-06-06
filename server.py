

from http.server import BaseHTTPRequestHandler, HTTPServer
import json

def lucas_number(n):
    if n == 0:
        return 2
    if n == 1:
        return 1
    return lucas_number(n - 1) + lucas_number(n - 2)

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/calculate':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            if 'n' in data:
                n = int(data['n'])
                result = lucas_number(n)
                process_time = 0  # 実行時間を計測する機能はまだ追加されていません
                response = json.dumps({'result': result, 'process_time': process_time})
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(response.encode('utf-8'))
            else:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Invalid Request')
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def do_GET(self):
        if self.path == '/':
            with open('index.html', 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(content)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
# python server.py
# http://127.0.0.1:8000/
# http://localhost:8000/
#/my_project
#    index.html
#    server.py