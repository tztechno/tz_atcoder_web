
### 
# Fastify+AJAX を用いてHTMLのscript内のlogicをbackendに移行するプロセス
### 

### 1. Fastify とは、AJAX とは 
#### Fastify 
FastifyはAPIサーバーの構築に非常に適した高性能なNode.jsフレームワークです。
#### AJAX 
AJAXとは、Asynchronous JavaScript and XMLの略称で、Web アプリケーションでデータを非同期的に転送する通信手法のことを指します。

### 2. プロジェクトの目的:
AJAX設置の練習として、StandAloneのHTML（元html）を、Fastify上にdeployし、さらにscript内のlogicをAJAXを用いてbackendに分離移行する過程を示す。
内容は、Atcoder ABC053a を簡易なwebアプリにしたもの。

### 3. Fastify上にdeployした状態
#### public/index.html 
元htmlをそのままコピペしたもの
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>abc077b</title>
</head>

<body>
    <h1>abc053a</h1>
    <p>
        すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
    </p>
    <form id="squareForm">
        <label for="N">Select your rate:</label>
        <input type="range" name="N" id="N" min="0" max="5000" value="1200" required>
        <span id="rateValue">1200</span> <!-- Span to display selected value -->
        <br>
        <input type="submit" value="Submit">
    </form>

    <p id="output"></p>

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
            var ANS;
            if (N < 1200) {
                ANS = "ABC";
            } else {
                ANS = "ARC";
            }
            document.getElementById('output').innerText = "RATE: " + N + "\nCONTEST: " + ANS;
        });
    </script>

</body>

</html>
```
#### server.js
before
```
// server.js
const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
        console.log('Server is running at http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
```
after
```
// server.js
const fastify = require('fastify')({ logger: true })
const path = require('path')
const fastifyStatic = require('@fastify/static')

// Register the static plugin
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/', // optional: default '/'
})

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
        console.log('Server is running at http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
```

### 3. script内のlogicをAJAXを用いてbackendに分離
#### public/index.html
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>abc077b</title>
</head>

<body>
    <h1>abc053a</h1>
    <p>
        すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
    </p>
    <form id="squareForm">
        <label for="N">Select your rate:</label>
        <input type="range" name="N" id="N" min="0" max="5000" value="1200" required>
        <span id="rateValue">1200</span> <!-- Span to display selected value -->
        <br>
        <input type="submit" value="Submit">
    </form>

    <p id="output"></p>

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

            // Make an AJAX request to the backend
            fetch('/api/getContest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rate: N })
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('output').innerText = "RATE: " + data.rate + "\nCONTEST: " + data.contest;
                })
                .catch(error => console.error('Error:', error));
        });
    </script>

</body>

</html>
```
#### server.js
```
// server.js
const fastify = require('fastify')({ logger: true })
const path = require('path')
const fastifyStatic = require('@fastify/static')

// Register the static plugin
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/', // optional: default '/'
})

// Define the new endpoint
fastify.post('/api/getContest', async (request, reply) => {
    const { rate } = request.body
    let contest
    if (rate < 1200) {
        contest = 'ABC'
    } else {
        contest = 'ARC'
    }
    return { rate, contest }
})

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
        console.log('Server is running at http://localhost:3000')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
```


