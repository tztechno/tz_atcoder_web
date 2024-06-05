
https://zenn.dev/articles/6a4957877ae431

2024-06-05

完成度 85/100
### 
# Expressで 静的HTMLファイルのフロントエンドに書かれたロジックを AJAX を用いてバックエンドに移行するプロセス
### 


## 1. Express、AJAX とは 
- Express.jsは、Node.js上で動作する、軽量で柔軟なWebアプリケーションフレームワークです。サーバーサイドのWebアプリケーションやモバイルアプリケーション開発に広く利用されています。
- AJAXとは、Asynchronous JavaScript and XMLの略称で、Web アプリケーションでデータを非同期的に転送する通信手法のことを指します。
- 
## 2. 題材:
ルーカス数（Lucas numbers）の計算。ルーカス数は、フィボナッチ数列に類似した整数の数列で、次の漸化式によって定義されます：
## 𝐿(𝑛)=𝐿(𝑛−1)+𝐿(𝑛−2)
初期条件:
## 𝐿(0)=2,𝐿(1)=1

## 3. やること:
ルーカス数をバックエンドで計算をする Webアプリを作ります。
- STEP 1: まず、スクリプトにjavascriptのロジックを含む静的HTMLファイルを、インストールしたFrameWorkにそのままデプロイします。
- STEP 2: 次に、静的HTMLファイル内のロジックをバックエンドに移行し、フロントとはAJAXと通信させる改造を加えます。


## 4. 手順
### STEP 1: Expressで静的HTMLファイルをホスティングする

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
//Lucas数の計算関数
        function lucas_number(n) {
            if (n === 0) {
                return 2;
            } else if (n === 1) {
                return 1;
            } else {
                return lucas_number(n - 1) + lucas_number(n - 2);
            }
        }
//計算と結果表示の関数
        function calculate() {
//入力値の取得
            var n = document.getElementById('inputN').value;
            var start_time = performance.now();
            var result = lucas_number(n);
            var process_time = performance.now() - start_time;
            document.getElementById('result').innerText =  "Lucas数 L" + n + " = " + result;
            document.getElementById('time').innerText = "処理時間: " + (process_time / 1000).toFixed(3) + "秒";
        }
    </script>

    <input type="number" id="inputN" min="1">
    <button onclick="calculate()">Calculate</button>
    <div id="result"></div>
    <div id="time"></div>
</body>
</html>
```
クリックするとcalculate関数が実行されます。Lucas数の計算関数を用いて、計算処理と結果表示までをフロントで行います。

### app.js
```
//モジュールのインポート
const express = require('express');
//アプリケーションの作成
const app = express();
// ポート番号の設定
const port = 3000;
//静的ファイルのホスティング
app.use(express.static('public'));
//サーバーの起動
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

```
静的ファイルのホスティングし、サーバーを起動します。

### STEP 2: フロントエンドに書かれたロジックを AJAX を用いてバックエンドに移行
### 階層構造
```
project-root
├── public
│   └── index.html　　: 改造されたHTML
├── app.js   : 計算ロジックが追加される
├── package.json
```
ファイル構成は変化しません。
### public/index.html
```
<!DOCTYPE html>
<html>
<body>
    <script>
        function sendRequest() {
//入力値の取得
            const n = document.getElementById('inputN').value;
//Fetch APIを使ってリクエストを送信
            fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ n })
            })
//サーバーからの応答を処理
                .then(response => response.json())
                .then(data => {
                    document.getElementById('result').innerText = `Lucas数 L${n} = ${data.result}`;
                    document.getElementById('time').innerText = `処理時間: ${(data.process_time / 1000).toFixed(3)}秒`;
                })
//エラーハンドリング
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
クリックするとsendRequest関数が実行されます。Fetch APIを使ってリクエストを送信すると共にサーバーからの応答を処理します。

### app.js
```
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));

/////////////////////////////移行されたロジック///////////////////////////////
app.use(express.json()); 
// POSTリクエストのハンドリング
app.post('/calculate', (req, res) => {
//リクエストボディの取得
    const n = req.body.n;
//パフォーマンス計測の開始
    const start_time = performance.now();
//ルーカス数の計算関数
    function lucas_number(n) {
        if (n === 0) {
            return 2;
        } else if (n === 1) {
            return 1;
        } else {
            return lucas_number(n - 1) + lucas_number(n - 2);
        }
    }
//ルーカス数の計算と処理時間の測定
    const result = lucas_number(n);
    const process_time = performance.now() - start_time;
//レスポンスの送信
    res.json({ result, process_time });
});
/////////////////////////////移行されたロジック///////////////////////////////

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
```
静的ファイルのホスティング、サーバーの起動に加えて、POSTリクエストを受信し、計算を行い、レスポンスの送信を行います。

## 5. まとめ

### 1. 静的HTMLファイルのフロントエンドからバックエンドへの移行:
- 静的HTMLファイルに埋め込まれたJavaScriptロジックを、Expressを用いてバックエンドに移行しました。
- 処理をサーバーサイドで行うことで、より効率的なアプリケーションを構築することができました。
### 2. AJAXを使用した通信の実装:
- ユーザーの入力に応じて非同期的にサーバーと通信するために、Fetch APIを使用したAJAX通信を実装しました。
- ユーザーはページを再読み込みすることなく、バックエンドとのデータの送受信を行うことができます。

  
