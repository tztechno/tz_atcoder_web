pyramidでwebページを作る

## step0: pyramid install and hello

---
```
pip install pyramid
```
set app.py
```
from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response

def hello_world(request):
    return Response('Hello, Pyramid!')

if __name__ == '__main__':
    with Configurator() as config:
        config.add_route('hello', '/')
        config.add_view(hello_world, route_name='hello')
        app = config.make_wsgi_app()
    
    server = make_server('0.0.0.0', 6543, app)
    print("Serving on http://0.0.0.0:6543")
    server.serve_forever()
```
```
python app.py
http://0.0.0.0:6543
```
## step1: create jinja2 pages
---
```
pip install pyramid_jinja2
```
hello.jinja2 and about.jinja2(abc053a.htmlをそのままコピー)
```
<html>
<body>
    <h1>Hello, {{ name }}!</h1>
</body>
</html>
```
app.py
```
from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.view import view_config

@view_config(route_name='hello', renderer='templates/hello.jinja2')
def hello_world(request):
    return {'name': 'Pyramid'}

@view_config(route_name='about', renderer='templates/about.jinja2')
def about(request):
    return {}

if __name__ == '__main__':
    with Configurator() as config:
        config.include('pyramid_jinja2')
        config.add_jinja2_renderer('.jinja2')
        
        config.add_route('hello', '/')
        config.add_route('about', '/about')
        config.scan()
        
        app = config.make_wsgi_app()
    
    server = make_server('0.0.0.0', 6543, app)
    print("Serving on http://0.0.0.0:6543")
    server.serve_forever()
```
python app.py
http://0.0.0.0:6543
http://0.0.0.0:6543/about

---
## step2: logic transfered to backend
