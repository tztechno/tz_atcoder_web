# ruby server.rb
# http://127.0.0.1:8000/

require 'webrick'

server = WEBrick::HTTPServer.new :Port => 8000

server.mount_proc '/' do |req, res|
  res.body = 'Hello, Ruby World!'
end

trap 'INT' do server.shutdown end

server.start