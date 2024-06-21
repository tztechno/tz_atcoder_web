const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // 任意のポート番号を指定します

// 静的ファイル（HTML、CSS、JavaScriptファイル）を提供するためのミドルウェアを設定します
app.use(express.static(path.join(__dirname, 'public')));

// サーバーを起動します
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
