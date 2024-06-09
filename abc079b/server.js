
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build'))); // Reactのビルド済みファイルを提供

// ルーカス数を計算する関数
function lucasNumber(n) {
    if (n === 0) return 2;
    if (n === 1) return 1;
    return lucasNumber(n - 1) + lucasNumber(n - 2);
}

// POSTリクエストを処理するルート
app.post('/calculate', (req, res) => {
    const n = parseInt(req.body.n, 10);

    const startTime = process.hrtime();

    const result = lucasNumber(n);

    const endTime = process.hrtime(startTime);
    const processTime = endTime[0] * 1000 + endTime[1] / 1e6; // ミリ秒に変換

    res.json({
        result,
        process_time: processTime
    });
});

// Reactアプリのエントリーポイントを提供
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});