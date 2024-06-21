const express = require('express');
const bodyParser = require('body-parser');
const { performance } = require('perf_hooks');

const app = express();
const port = 3000;

// body-parserを使用してJSONをパースする設定
app.use(bodyParser.json());

// 静的ファイル（HTML、CSS、JavaScript）を提供するためのミドルウェア
app.use(express.static('public'));

// Lucas数を計算する関数
function calculateLucasNumber(n) {
    if (n === 0) return 2;
    if (n === 1) return 1;
    let a = 2, b = 1, temp;
    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// POSTリクエスト '/calculate' を処理する
app.post('/calculate', (req, res) => {
    const { n } = req.body;

    // 計算開始時刻を記録
    const startTime = performance.now();

    // Lucas数を計算
    const result = calculateLucasNumber(parseInt(n));

    // 計算終了時刻を記録し、処理時間を計算
    const endTime = performance.now();
    const processTime = endTime - startTime;

    // 結果と処理時間をJSON形式で返す
    res.json({ result, process_time: processTime });
});

// サーバーを起動する
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

