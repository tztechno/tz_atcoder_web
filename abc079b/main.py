import tornado.ioloop
import tornado.web
import json
import math
import time

# Lucas数を計算する関数 old type
def lucas(n):
    if n == 0:
        return 2
    if n == 1:
        return 1
    return lucas(n - 1) + lucas(n - 2)

# Lucas数を計算する関数 new type
def lucas2(n):
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