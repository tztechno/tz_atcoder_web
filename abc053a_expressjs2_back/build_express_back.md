### 

```
Express.jsを使ってバックエンドで処理するように変更しましょう。
まず、フロントエンドのスクリプトをバックエンドに移し、フロントエンドとバックエンドが通信できるようにします。
次に、Expressサーバーをセットアップし、POSTリクエストを受け取って適切なレスポンスを返すルートを作成します。
index.htmlを更新して、JavaScriptからバックエンドにPOSTリクエストを送るように変更します。
server.jsファイルを作成してExpressサーバーをセットアップし、POSTリクエストを処理するエンドポイントを追加します。
```

### フロントエンド（index.html）
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

            // POST data to the server
            fetch('/rate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ N: N })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('output').innerText = "RATE: " + data.N + "\nCONTEST: " + data.ANS;
            })
            .catch(error => console.error('Error:', error));
        });
    </script>

</body>

</html>
```
### バックエンド（server.js）
```
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

app.post('/rate', (req, res) => {
    const { N } = req.body;
    let ANS;
    
    if (N < 1200) {
        ANS = "ABC";
    } else {
        ANS = "ARC";
    }

    res.json({ N, ANS });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```
### 手順
フロントエンドのHTMLファイルをpublicディレクトリに保存します。例: public/index.html
バックエンドのコードをserver.jsとして保存します。
Node.jsとnpmがインストールされていることを確認し、プロジェクトのディレクトリで以下のコマンドを実行してExpressとbody-parserをインストールします:
```
cd my-express-app
npm init -y
npm install express body-parser
サーバーを起動します:
cd my-express-app
node server.js
```

ブラウザで http://localhost:3000 を開きます。
これで、スライダーの値を変更してフォームを送信すると、バックエンドで処理された結果が表示されます。

### 階層
```
my-express-app/
├── public/
│   └── index.html
├── server.js
└── package.json
```



