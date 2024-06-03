pyramidでwebページを作る

## step0: pyramid install and hello

---
```
pip install pyramid
```
set initial app.py
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
set hello.jinja2
```
<html>
<body>
    <h1>Hello, {{ name }}!</h1>
</body>
</html>
```
set about.jinja2(表示したいhtmlを丸ごとコピー、　script部分を示す)
```
    <script>
        // Get elements
        var slider = document.getElementById('N');
        var output = document.getElementById('rateValue');

        // Display the default value
        output.innerHTML = slider.value;

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function () {
            output.innerHTML = this.value;
        };

        document.getElementById('squareForm').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            var N = parseInt(document.getElementById('N').value);
        #######################移管する予定のlogic#########################
            var ANS;
            if (N < 1200) {
                ANS = "ABC";
            } else {
                ANS = "ARC";
            }
        #######################移管する予定のlogic#########################
            document.getElementById('output').innerText = "RATE: " + N + "\nCONTEST: " + ANS;
        });
    </script>
```
set app.py
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
```
python app.py
http://0.0.0.0:6543
http://0.0.0.0:6543/about
```
---
## step2: logic transfered to backend
logicを含むapp.py
```
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

##########################移管されたlogic部分###############################
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
##########################移管されたlogic部分#################################

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
```
logicが抜かれたabout.jinja2のscript部分
```
<script>
    // Get elements
    var slider = document.getElementById('N');
    var output = document.getElementById('rateValue');

    // Display the default value
    output.innerHTML = slider.value;

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value;
    };

    document.getElementById('squareForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        var N = parseInt(document.getElementById('N').value);

        #########################サーバーとの送受信#########################
        // Send the data to the server
        fetch('/check_rate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ N: N }),
        })
        .then(response => response.json())
        .then(data => {
            // Update the output based on the server's response
            document.getElementById('output').innerText = "RATE: " + N + "\nCONTEST: " + data.result;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        #########################サーバーとの送受信#########################
    });
</script>
```

