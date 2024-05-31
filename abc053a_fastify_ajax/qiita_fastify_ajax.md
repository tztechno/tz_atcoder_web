

# Fastify+AJAX を用いてHTMLのscript🈚️logicをbackendに移行するプロセス

### 

### 1. Fastify とは、AJAX とは 
#### Fastify 
FastifyはAPIサーバーの構築に非常に適した高性能なNode.jsフレームワークです。
#### AJAX 
AJAXとは、Asynchronous JavaScript and XMLの略称で、Web アプリケーションでデータを非同期的に転送する通信手法のことを指します。

### 2. プロジェクトの目的:
AJAX設置の練習として、StandAloneのHTML（元html）を、Fastify上にdeployし、さらにscript内のlogicをAJAXを用いてbackendに分離移行する過程を示す。
内容は、Atcoder ABC053a を簡易なwebアプリにしたもの。

### 3. Fastify上にdeployした状態
#### public/index.html 
元htmlをそのままコピペしたもの
```
```
#### server.js
before
```
```
after
```
```

### 3. script内のlogicをAJAXを用いてbackendに分離
#### public/index.html
```
```
#### server.js
```
```


