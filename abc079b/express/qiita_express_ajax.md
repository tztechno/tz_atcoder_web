

### 
# Expressで 静的HTMLファイルのフロントエンドに書かれたロジックを AJAX を用いてバックエンドに移行するプロセス
### 
完成度 65/100

## 1. Express、AJAX とは 
- ExpressはExpress.jsは、Node.js上で動作する、軽量で柔軟なWebアプリケーションフレームワークです。サーバーサイドのWebアプリケーションやモバイルアプリケーション開発に広く利用されています。
- AJAXとは、Asynchronous JavaScript and XMLの略称で、Web アプリケーションでデータを非同期的に転送する通信手法のことを指します。

## 2. やること:
- まず、スクリプトにjavascriptのロジックを含む静的HTMLファイルを、インストールしたFrameWorkにそのままデプロイします。
- 次に、静的HTMLファイル内のロジックをバックエンドに移行し、フロントとはAJAXと通信させる改造を加えます。

## 2. 題材:
ルーカス数（Lucas numbers）の計算（AtCoderの問題:ABC079B）。
ルーカス数は、フィボナッチ数列に類似した整数の数列で、次の漸化式によって定義されます：
#### 𝐿(𝑛)=𝐿(𝑛−1)+𝐿(𝑛−2)
#### 初期条件: 𝐿(0)=2,𝐿(1)=1

## 3. Expressで静的HTMLファイルをホスティングする

### 階層構造
```
project-root
├── public
│   └── index.html　　: 静的HTMLをそのまま置く。
├── app.js
├── package.json
```
### デプロイされる静的HTML
```
<!DOCTYPE html>
<html>
<body>
    <script>
        function lucas_number(n) {
            if (n === 0) {
                return 2;
            } else if (n === 1) {
                return 1;
            } else {
                return lucas_number(n - 1) + lucas_number(n - 2);
            }
        }
        function calculate() {
            var n = document.getElementById('inputN').value;
            var start_time = performance.now();
            var result = lucas_number(n);
            var process_time = performance.now() - start_time;
            document.getElementById('result').innerText = "Lucas数 L" + n + " = " + result;
            document.getElementById('time').innerText = "処理時間: " + (process_time / 1000).toFixed(3) + "秒";
        }
    </script>
    <input type="number" id="inputN" min="1">
    <button onclick="calculate()">Calculate</button>
    <p id="result"></p>
    <p id="time"></p>
</body>
</html>
```
クリックするとcalculate関数が実行されます。
### app.js
```
const express = require('express');
const app = express();
const port = 3000; // Replace with your preferred port
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

```

## 4. フロントエンドに書かれたロジックを AJAX を用いてバックエンドに移行

### public/index.html
```
<!DOCTYPE html>
<html>
<body>
    <script>
        function sendRequest() {
            const n = document.getElementById('inputN').value;
            fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ n })
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('result').innerText = `Lucas数 L${n} = ${data.result}`;
                    document.getElementById('time').innerText = `処理時間: ${(data.process_time / 1000).toFixed(3)}秒`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    </script>

    <input type="number" id="inputN" placeholder="Enter a number">
    <button onclick="sendRequest()">Calculate</button>
    <div id="result"></div>
    <div id="time"></div>
</body>
</html>
```
クリックするとsendRequest関数が実行されます。

### app.js
```
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));

/////////////////////////////移行されたロジック///////////////////////////////
app.use(express.json()); // JSONデータを解析するために必要

app.post('/calculate', (req, res) => {
    const n = req.body.n;
    const start_time = performance.now();
    function lucas_number(n) {
        if (n === 0) {
            return 2;
        } else if (n === 1) {
            return 1;
        } else {
            return lucas_number(n - 1) + lucas_number(n - 2);
        }
    }
    const result = lucas_number(n);
    const process_time = performance.now() - start_time;
    res.json({ result, process_time });
});
/////////////////////////////移行されたロジック///////////////////////////////

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
```

## 5. 全体の流れ

今回、Express で 静的HTMLファイルのフロントエンドに書かれたロジックを AJAX を用いてバックエンドに移行するプロセスを示しました。
