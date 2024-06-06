# ruby server.rb
# http://127.0.0.1:8000/

require 'webrick'

root = File.expand_path('.')
server = WEBrick::HTTPServer.new :Port => 8000, :DocumentRoot => root

trap 'INT' do server.shutdown end

server.start
