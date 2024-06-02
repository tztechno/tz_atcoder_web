```
cd myapp
composer create-project symfony/website-skeleton .

失敗例
symfony server:start
php bin/console server:run
php bin/console server:start

成功例
php -S 127.0.0.1:8000 -t public
with assert.warning deprecation notice

http://localhost:8000 
http://127.0.0.1:8000
```
---

web appを載せる
```
templates/abc053a.html.twigファイルを作成し、HTMLコードを貼り付け
src/Controller/Abc053aController.phpファイルを作成
config/routes.yamlファイルに以下を追記

Symfonyサーバーを再起動する
cd myapp
php -S 127.0.0.1:8000 -t public
ブラウザで http://localhost:8000/abc053a にアクセスする

with assert.warning deprecation notice
Deprecated: ini_set(): assert.warning INI setting is deprecated in /Users/shun_ishii/Projects/pj0/myapp/vendor/symfony/runtime/Internal/BasicErrorHandler.php on line 35
```
```
myapp/ (Symfonyプロジェクトのルートディレクトリ)
├── config/
│   └── routes.yaml (ルーティングの設定を追記)
├── src/
│   └── Controller/
│       └── Abc053aController.php (新しいコントローラを作成)
├── templates/
│   └── abc053a.html.twig (Twigテンプレートファイルを作成、HTMLコードを貼り付け)
├── ... (他のSymfonyのファイルやディレクトリ)

```
