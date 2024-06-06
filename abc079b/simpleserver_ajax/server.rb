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
    if data['n']
      n = data['n'].to_i

      start_time = Time.now  # 計測開始
      result = lucas_number(n)
      end_time = Time.now  # 計測終了

      process_time = (end_time - start_time) * 1000  # ミリ秒単位に変換
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


# ruby server.rb
# http://127.0.0.1:8000/
# http://localhost:8000/
