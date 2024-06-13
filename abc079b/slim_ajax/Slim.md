###
# Slim
###

---

PHPのフレームワーク「Slim」を使用して、ウェブに「Hello」を表示するための手順を説明します。以下の手順に従ってください。

### 1. Composerのインストール
ComposerはPHPの依存管理ツールで、Slimをインストールするために必要です。まず、Composerをインストールします。

#### Windowsの場合
Composerを[公式サイト](https://getcomposer.org/download/)からダウンロードし、インストールします。

#### macOS/Linuxの場合
ターミナルを開き、以下のコマンドを実行します：

```sh
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### 2. Slimフレームワークのインストール
Composerがインストールされたら、プロジェクトフォルダを作成し、Slimをインストールします。

```sh
mkdir myapp
cd myapp
composer require slim/slim "^4.0"
composer require slim/psr7
```

### 3. Slimアプリケーションの設定
インストールが完了したら、以下のようにプロジェクトのエントリーポイント（例：`index.php`）を作成します。

```php
<?php
require 'vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello, world!");
    return $response;
});

$app->run();
```

### 4. ウェブサーバの起動
Slimアプリケーションを動作させるために、PHPのビルトインウェブサーバを使用します。以下のコマンドをプロジェクトディレクトリで実行します：

```sh
php -S localhost:8080
```

### 5. ブラウザで確認
ブラウザを開き、以下のURLにアクセスします：

```
http://localhost:8080
```

「Hello, world!」と表示されれば、Slimフレームワークの設定は成功です。

これで、Slimフレームワークを使用してウェブに「Hello」を表示することができました。必要に応じて、この基本的な設定を拡張して、複雑なウェブアプリケーションを作成できます。

---
```
cd myapp
php -S localhost:8080 -t public
http://localhost:8080/ajax.html
```
