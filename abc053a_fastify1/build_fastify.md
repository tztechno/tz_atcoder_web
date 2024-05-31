npm install fastify

ルートディレクトリにserver.jsというファイルを作成

node server.js

http://localhost:3000


--------------------------

# myappデプロイ
```
npm install @fastify/static

project-root
├── public
│   └── index.html  (あなたのHTMLファイル)
├── server.js
├── package.json

HTMLファイルをpublicディレクトリにindex.htmlとして保存
そのまま置くだけ、backend無し、意味なし

server.jsの修正

node server.js

http://localhost:3000
```
