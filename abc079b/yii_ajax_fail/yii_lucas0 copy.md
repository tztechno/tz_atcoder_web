Yiiフレームワークをインストールして、指定の静的HTMLファイルを表示する方法を説明します。以下の手順に従ってください。

### 1. Yiiのインストール

まず、Composerを使用してYiiフレームワークをインストールします。Composerがインストールされていない場合は、公式サイト（https://getcomposer.org/）からインストールしてください。

#### ComposerによるYiiインストール

ターミナル（またはコマンドプロンプト）を開き、以下のコマンドを実行して新しいYiiプロジェクトを作成します。

```sh
composer create-project --prefer-dist yiisoft/yii2-app-basic basic
```

このコマンドは`basic`というディレクトリに新しいYiiプロジェクトを作成します。

### 2. Yiiプロジェクトの設定

作成されたプロジェクトディレクトリに移動します。

```sh
cd basic
```

### 3. ウェブサーバーの起動

以下のコマンドを実行して、組み込みのPHPウェブサーバーを起動します。

```sh
php yii serve
```

このコマンドを実行すると、デフォルトで`localhost:8080`でウェブサーバーが起動します。

$ http://localhost:8080
$ 成功

### 4. 静的HTMLファイルの表示

指定の静的HTMLファイルを表示するには、以下の手順に従います。

#### 4.1. 静的HTMLファイルをプロジェクトに追加

例えば、`static`というディレクトリを`web`ディレクトリの中に作成し、そこに静的HTMLファイルを追加します。

```sh
mkdir web/static
```

次に、静的HTMLファイル（例えば`example.html`）を`web/static`ディレクトリに配置します。

#### 4.2. コントローラーの設定

`controllers/SiteController.php`を編集して、静的HTMLファイルを表示するアクションを追加します。

```php
<?php

namespace app\controllers;

use yii\web\Controller;

class SiteController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionStatic()
    {
        return $this->renderPartial('@app/web/static/example.html');
    }

    // 他のアクション...
}
```

#### 4.3. ルートの設定

デフォルトのルーティング設定は`config/web.php`にあります。ここに、新しいアクションへのルートを追加します。

```php
'components' => [
    'urlManager' => [
        'enablePrettyUrl' => true,
        'showScriptName' => false,
        'rules' => [
            '' => 'site/index',
            'static' => 'site/static',
            // 他のルール...
        ],
    ],
    // 他のコンポーネント...
],
```

### 5. アプリケーションのアクセス

これで、以下のURLにアクセスすると、静的HTMLファイルが表示されます。

```
http://localhost:8080/static
```
$ １回目　The requested resource /static was not found on this server.

$ cd basic
$ php yii serve

$ 2回目　index.htmlに名前を変えて、表示成功

### 完全なプロジェクト例

`basic`ディレクトリの構造は次のようになります：

```
basic/
├── assets/
├── commands/
├── config/
│   ├── console.php
│   └── web.php
├── controllers/
│   └── SiteController.php
├── mail/
├── models/
├── runtime/
├── vendor/
├── views/
│   └── site/
│       ├── index.php
│       └── static.php (必要ならば)
└── web/
    ├── assets/
    ├── static/
    │   └── index.html
    ├── index.php
    └── ...
```

以上の手順で、Yiiフレームワークをインストールし、指定の静的HTMLファイルを表示することができます。

$ next stepへ
$ 現在、index.htmlは以下の通りです。scriptの中のlucas数を計算する部分、計算時間を測定する部分をAJAXを使ってbackendに移行したいです。
