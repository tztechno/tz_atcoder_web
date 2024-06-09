

Pythonの`Tornado`フレームワークを使用して、バックエンドを構築します。以下の手順に従って、`Tornado`を使用してバックエンドを構築し、`ajax.html`からのリクエストに応答します。

### 1. Tornadoのインストール

まず、`Tornado`をインストールします。

```bash
pip install tornado
```

### 2. バックエンドのコード

次に、`main.py`という名前のファイルを作成し、以下のコードを追加します。

```python
import tornado.ioloop
import tornado.web
import json
import math
import time

# Lucas数を計算する関数
def lucas(n):
    if n == 0:
        return 2
    elif n == 1:
        return 1
    else:
        l0 = 2
        l1 = 1
        for _ in range(2, n + 1):
            l = l0 + l1
            l0 = l1
            l1 = l
        return l

# メインハンドラ
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("ajax.html")

# 計算ハンドラ
class CalculateHandler(tornado.web.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        n = int(data['n'])

        start_time = time.time()
        result = lucas(n)
        process_time = (time.time() - start_time) * 1000  # ミリ秒単位で計算時間を取得

        self.write({'result': result, 'process_time': process_time})

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/calculate", CalculateHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
```

### 3. `ajax.html`ファイルの準備

`ajax.html`は提供されたものを使用します。

### 4. サーバーの起動

以下のコマンドを使用して、サーバーを起動します。

```bash
python main.py
```

### 5. ブラウザでアクセス

ブラウザで`http://localhost:8888/`にアクセスし、入力フィールドに数値を入力し、「Calculate」ボタンを押すと、計算結果と計算時間が表示されます。

これで、Pythonの`Tornado`フレームワークを使用して、バックエンドを構築し、`ajax.html`からのリクエストに応答する準備が整いました。
