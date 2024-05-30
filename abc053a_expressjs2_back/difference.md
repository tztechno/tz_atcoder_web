### difference
---
```

```
---
```

```
---
```

```
---
server.js after 
```
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
```
server.js before
```
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
```
---
index.html after
```
    <script>
        // Get elements
        var slider = document.getElementById('N');
        var output = document.getElementById('rateValue');

        // Display the default value
        output.innerHTML = slider.value;

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function () {
            output.innerHTML = this.value;
        };

        document.getElementById('squareForm').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            var N = parseInt(document.getElementById('N').value);

            // POST data to the server
            fetch('/rate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ N: N })
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('output').innerText = "RATE: " + data.N + "\nCONTEST: " + data.ANS;
                })
                .catch(error => console.error('Error:', error));
        });
    </script>
```
index.html before
```
    <script>
        // Get elements
        var slider = document.getElementById('N');
        var output = document.getElementById('rateValue');

        // Display the default value
        output.innerHTML = slider.value;

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function () {
            output.innerHTML = this.value;
        };

        document.getElementById('squareForm').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            var N = parseInt(document.getElementById('N').value);
            var ANS;
            if (N < 1200) {
                ANS = "ABC";
            } else {
                ANS = "ARC";
            }
            document.getElementById('output').innerText = "RATE: " + N + "\nCONTEST: " + ANS;
        });
    </script>
```
---
