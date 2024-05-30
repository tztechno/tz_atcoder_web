const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

app.post('/rate', (req, res) => {
    const { N } = req.body;
    let ANS;

    if (N < 1200) {
        ANS = "ABC";
    } else {
        ANS = "ARC";
    }

    res.json({ N, ANS });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
