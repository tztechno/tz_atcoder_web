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
