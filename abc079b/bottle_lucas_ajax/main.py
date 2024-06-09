
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
