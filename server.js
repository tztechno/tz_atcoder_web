const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 静的ファイルを提供する
app.use(express.static(path.join(__dirname, 'public')));

// ルートリクエストをindex.htmlにルーティングする
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// サーバーを起動する
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
