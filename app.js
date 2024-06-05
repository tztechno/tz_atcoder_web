const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/calculate', (req, res) => {
    const n = parseInt(req.body.n);
    const start_time = performance.now();
    const result = lucas_number(n);
    const process_time = performance.now() - start_time;
    res.json({ result, process_time });
});

function lucas_number(n) {
    if (n === 0) {
        return 2;
    } else if (n === 1) {
        return 1;
    } else {
        return lucas_number(n - 1) + lucas_number(n - 2);
    }
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
