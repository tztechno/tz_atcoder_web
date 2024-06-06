require 'webrick'
require 'json'

def lucas_number(n)
  return 2 if n == 0
  return 1 if n == 1
  lucas_number(n - 1) + lucas_number(n - 2)
end

server = WEBrick::HTTPServer.new(:Port => 8000)

server.mount_proc '/calculate' do |req, res|
  if req.request_method == 'POST'
    data = JSON.parse(req.body)
    p req.path # デバッグ用：リクエストパスを表示
    if data['n']
      n = data['n'].to_i
      result = lucas_number(n)
      process_time = 0  # 実行時間を計測する機能はまだ追加されていません
      res['Content-Type'] = 'application/json'
      res.body = { result: result, process_time: process_time.round(3) }.to_json
    else
      res.status = 400
      res.body = 'Invalid Request'
    end
  else
    res.status = 404
    res.body = 'Not Found'
  end
end

server.mount_proc '/' do |req, res|
  res.body = File.read('index.html')
  res['Content-Type'] = 'text/html'
end

trap 'INT' do server.shutdown end

server.start



#ruby server.rb
#http://127.0.0.1:8000/
#http://localhost:8000/
