
Ajaxを動作させるための構成に集中し、バックエンドの設定とReactアプリケーションの構成を最小限に抑える方法について説明します。

以下の手順に従ってください：

### 1. Reactアプリの構成変更
Reactアプリは静的ファイルを提供するために使われているため、これをバックエンドサーバーの一部として統合します。

#### 1.1. `server.js` の修正
Expressサーバーを設定して、Reactのビルド済みファイルを提供するようにします。

```js
// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build'))); // Reactのビルド済みファイルを提供

// ルーカス数を計算する関数
function lucasNumber(n) {
  if (n === 0) return 2;
  if (n === 1) return 1;
  return lucasNumber(n - 1) + lucasNumber(n - 2);
}

// POSTリクエストを処理するルート
app.post('/calculate', (req, res) => {
  const n = parseInt(req.body.n, 10);
  
  const startTime = process.hrtime();

  const result = lucasNumber(n);

  const endTime = process.hrtime(startTime);
  const processTime = endTime[0] * 1000 + endTime[1] / 1e6; // ミリ秒に変換

  res.json({
    result,
    process_time: processTime
  });
});

// Reactアプリのエントリーポイントを提供
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

#### 1.2. Reactアプリのビルド
Reactアプリをビルドして、ビルド済みファイルをサーバーで提供できるようにします。

```sh
npm run build
```

これにより、`build`ディレクトリが作成されます。これには、静的ファイル（HTML、CSS、JavaScript）が含まれています。

### 2. `ajax.html` の配置
`ajax.html` を `public` フォルダに配置し、それをビルドする必要はありません。そのままの形で提供します。

### 3. サーバーの起動
以下のコマンドを使用してサーバーを起動します。

```sh
node server.js
```

### 4. `ajax.html` の修正
`ajax.html` はそのままで問題ありません。バックエンドサーバーが POST リクエストを処理し、ルーカス数を計算して結果を返すようになっています。

```html
<!DOCTYPE html>
<html>

<head>
    <title>Lucas Number Calculator</title>
</head>

<body>
    <p>AJAX Lucas Number</p>
    <input type="number" id="inputN" placeholder="Enter a number">
    <button onclick="sendRequest()">Calculate</button>
    <div id="result"></div>
    <div id="time"></div>

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
                    document.getElementById('result').innerText = `Lucas Number L${n} = ${data.result}`;
                    document.getElementById('time').innerText = `Time: ${(data.process_time / 1000).toFixed(3)} sec`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    </script>
</body>

</html>
```

### まとめ
- `server.js` はExpressサーバーを設定して、Reactのビルド済みファイルと静的ファイル（`ajax.html`）を提供します。
- Reactアプリをビルドして、ビルド済みファイルをサーバーで提供します。
- `ajax.html`はそのまま`public`フォルダに配置し、サーバーから提供されるようにします。

これで、Reactアプリケーションとバックエンドが統合され、`ajax.html`からのリクエストを処理できるようになります。
