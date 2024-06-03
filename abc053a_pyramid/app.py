from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.view import view_config
from pyramid.request import Request
from pyramid.httpexceptions import HTTPBadRequest

@view_config(route_name='hello', renderer='templates/hello.jinja2')
def hello_world(request):
    return {'name': 'Pyramid'}

@view_config(route_name='about', renderer='templates/about.jinja2')
def about(request):
    return {}

@view_config(route_name='check_rate', renderer='json')
def check_rate(request: Request):
    try:
        N = int(request.json['N'])
        if N < 1200:
            ANS = "ABC"
        else:
            ANS = "ARC"
        return {'result': ANS}
    except KeyError:
        return HTTPBadRequest(json={'error': 'Invalid request payload'})

if __name__ == '__main__':
    with Configurator() as config:
        config.include('pyramid_jinja2')
        config.add_jinja2_renderer('.jinja2')
        
        config.add_route('hello', '/')
        config.add_route('about', '/about')
        config.add_route('check_rate', '/check_rate')  # check_rate ルートの追加        
        config.scan()
        
        app = config.make_wsgi_app()
    
    server = make_server('0.0.0.0', 6543, app)
    print("Serving on http://0.0.0.0:6543")
    server.serve_forever()
