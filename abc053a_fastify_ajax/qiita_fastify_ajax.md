
### 
# Fastify Webアプリ：フロントエンドに書かれたロジックを AJAX を用いてバックエンドに移行するプロセス
### 

## 1. Fastify、AJAX とは 

- FastifyはAPIサーバーの構築に非常に適した高性能なNode.jsフレームワークです。
- AJAXとは、Asynchronous JavaScript and XMLの略称で、Web アプリケーションでデータを非同期的に転送する通信手法のことを指します。

## 2. 内容:
AJAX設置例として、StandAloneのHTML（元html）を、Fastify上にdeployし、さらにスクリプト内のロジックをAJAXを用いてbackendに分離移行することをcGPTに相談しつつ実現できたので、その過程・内容についてまとめます。

内容はAtcoder ABC053a の設問を簡易なwebアプリにしたもの。

### 元htmlの全体像
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>abc053a</title>
</head>

<body>
    <h1>abc053a</h1>
    <p>
        現在のレートxが1200未満かどうかで、参加するコンテスト（ABC/ARC）を選択し出力する。
    </p>
    <form id="squareForm">
        <label for="N">Select your rate:</label>
        <input type="range" name="N" id="N" min="0" max="4000" value="1200" required>
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

       /////////////////////////////backendに移行されるlogic部分/////////////////////////////////////
            var ANS;
            if (N < 1200) {
                ANS = "ABC";
            } else {
                ANS = "ARC";
            }
       ////////////////////////////////////////////////////////////////////////////////////////////
            document.getElementById('output').innerText = "RATE: " + N + "\nCONTEST: " + ANS;

        });

    </script>

</body>

</html>
```
## 3. Fastify上にdeployした状態
### 階層構造
```
project-root
├── public
│   └── index.html　　: 元htmlをそのままコピペするだけ。
├── server.js
├── package.json
```

### server.js
```
// server.js
const fastify = require('fastify')({ logger: true })
const path = require('path')
const fastifyStatic = require('@fastify/static')

/////////////////元server.jsに対してpublic/index.html設置に伴いこの部分が追加される////////////////////
// Register the static plugin
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/', // optional: default '/'
})
//////////////////////////////////////////////////////////////////////////////////////////////////

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

## 3. フロントエンドに書かれたロジックを AJAX を用いてバックエンドに移行
### public/index.html
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

       ///////////////////サーバーとの送受信をメソッドを記載///////////////////////////////
       ////////////////////HTTP POSTメソッドを使用し値をrateというキーで送信。//////////////
            // Make an AJAX request to the backend
            fetch('/api/getContest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rate: N })
            })
        /////////////////////////サーバーからの応答をJSON形式にパース///////////////////////
                .then(response => response.json())
                .then(data => {
                    document.getElementById('output').innerText = "RATE: " + data.rate + "\nCONTEST: " + data.contest;
                })
                .catch(error => console.error('Error:', error));
         //////////////////////////////////////////////////////////////////////////////

        });
    </script>
```
### server.js
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

///////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////

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


