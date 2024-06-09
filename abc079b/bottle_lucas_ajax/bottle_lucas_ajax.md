
了解しました。Bottleフレームワークを使用して同じアプリケーションを構築しましょう。以下が手順です。

### 1. Bottleのインストール

まず、Bottleフレームワークをインストールします。

```bash
pip install bottle
```

### 2. バックエンドのコード

次に、`main.py`という名前のファイルを作成し、以下のコードを追加します。

```python
from bottle import Bottle, request, response, run, template, static_file
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

# メインアプリケーション
app = Bottle()

# 静的ファイルのルーティング
@app.route('/')
def index():
    return static_file('ajax.html', root='./public')

# Lucas数を計算するエンドポイント
@app.post('/calculate')
def calculate():
    data = request.json
    n = int(data['n'])

    start_time = time.time()
    result = lucas(n)
    process_time = (time.time() - start_time) * 1000  # ミリ秒単位で計算時間を取得

    response.content_type = 'application/json'
    return {'result': result, 'process_time': process_time}

if __name__ == "__main__":
    app.run(host='localhost', port=8888, debug=True)
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

これで、Bottleフレームワークを使用して、バックエンドを構築し、`ajax.html`からのリクエストに応答する準備が整いました。
