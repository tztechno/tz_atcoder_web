### 1. バックエンドに計算ロジックを移行

まず、バックエンドでLucas数を計算し、その処理時間を返すAPIエンドポイントを作成します。Yiiフレームワークのコントローラーを使って実装します。

#### コントローラーの作成

`controllers/SiteController.php`に新しいアクションを追加します。

```php
<?php

namespace app\controllers;

use yii\web\Controller;
use yii\web\Response;
use Yii;

class SiteController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionCalculateLucas()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $n = Yii::$app->request->post('n');
        $startTime = microtime(true);
        $result = $this->lucasNumber($n);
        $endTime = microtime(true);

        return [
            'result' => $result,
            'time' => $endTime - $startTime,
        ];
    }

    private function lucasNumber($n)
    {
        if ($n == 0) {
            return 2;
        } elseif ($n == 1) {
            return 1;
        } else {
            return $this->lucasNumber($n - 1) + $this->lucasNumber($n - 2);
        }
    }
}
```

### 2. フロントエンドの変更

次に、AJAXリクエストを使用して、バックエンドのAPIエンドポイントに対して計算リクエストを送信するようにフロントエンドを変更します。

#### `index.html`の修正

`index.html`ファイルを以下のように修正します。

```html
<!DOCTYPE html>
<html>

<head>
    <title>Lucas</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        function calculate() {
            var n = document.getElementById('inputN').value;

            $.ajax({
                type: 'POST',
                url: '/site/calculate-lucas',
                data: { n: n },
                success: function(data) {
                    document.getElementById('result').innerText = "L" + n + " = " + data.result;
                    document.getElementById('time').innerText = "Time: " + data.time.toFixed(3) + " sec";
                },
                error: function() {
                    document.getElementById('result').innerText = "Error calculating Lucas number.";
                    document.getElementById('time').innerText = "";
                }
            });
        }
    </script>
</head>

<body>
    <h1>Lucas</h1>
    <input type="number" id="inputN" min="1">
    <button onclick="calculate()">Calculate</button>
    <p id="result"></p>
    <p id="time"></p>
</body>

</html>
```

### 3. ルーティングの設定

`config/web.php`にルートを追加します。

```php
'components' => [
    'urlManager' => [
        'enablePrettyUrl' => true,
        'showScriptName' => false,
        'rules' => [
            '' => 'site/index',
            'static' => 'site/static',
            'POST site/calculate-lucas' => 'site/calculate-lucas',
        ],
    ],
],
```

### 完成したプロジェクト構成

#### `controllers/SiteController.php`

```php
<?php

namespace app\controllers;

use yii\web\Controller;
use yii\web\Response;
use Yii;

class SiteController extends Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionCalculateLucas()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $n = Yii::$app->request->post('n');
        $startTime = microtime(true);
        $result = $this->lucasNumber($n);
        $endTime = microtime(true);

        return [
            'result' => $result,
            'time' => $endTime - $startTime,
        ];
    }

    private function lucasNumber($n)
    {
        if ($n == 0) {
            return 2;
        } elseif ($n == 1) {
            return 1;
        } else {
            return $this->lucasNumber($n - 1) + $this->lucasNumber($n - 2);
        }
    }
}
```

#### `config/web.php`

```php
<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            'cookieValidationKey' => 'your-secret-key',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                '' => 'site/index',
                'static' => 'site/static',
                'POST site/calculate-lucas' => 'site/calculate-lucas',
            ],
        ],
    ],
    'params' => $params,
];

return $config;
```

#### `web/static/index.html`

```html
<!DOCTYPE html>
<html>

<head>
    <title>Lucas</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        function calculate() {
            var n = document.getElementById('inputN').value;

            $.ajax({
                type: 'POST',
                url: '/site/calculate-lucas',
                data: { n: n },
                success: function(data) {
                    document.getElementById('result').innerText = "L" + n + " = " + data.result;
                    document.getElementById('time').innerText = "Time: " + data.time.toFixed(3) + " sec";
                },
                error: function() {
                    document.getElementById('result').innerText = "Error calculating Lucas number.";
                    document.getElementById('time').innerText = "";
                }
            });
        }
    </script>
</head>

<body>
    <h1>Lucas</h1>
    <input type="number" id="inputN" min="1">
    <button onclick="calculate()">Calculate</button>
    <p id="result"></p>
    <p id="time"></p>
</body>

</html>
```

これで、Lucas数の計算がバックエンドで行われ、その結果と処理時間がフロントエンドに表示されるようになります。何か他にご質問があれば教えてください。


$ Error calculating Lucas number.

$ cd basic
$ php yii serve
$ http://localhost:8080