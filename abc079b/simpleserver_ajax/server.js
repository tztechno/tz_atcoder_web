

const http = require('http');

function lucas_number(n) {
    if (n === 0) return 2;
    if (n === 1) return 1;
    return lucas_number(n - 1) + lucas_number(n - 2);
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/calculate') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { n } = JSON.parse(body);
            const start_time = process.hrtime();
            const result = lucas_number(n);
            const end_time = process.hrtime(start_time);
            const process_time = (end_time[0] + end_time[1] / 1e9).toFixed(3);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ result: result, process_time: process_time }));
        });
    } else if (req.method === 'GET' && req.url === '/') {
        // index.htmlのサーバーへのリクエストを処理する
        const fs = require('fs');
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 8000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

//node server.js
//http://127.0.0.1:8000/
//http://localhost:8000/
