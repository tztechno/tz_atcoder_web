---
index.html before
```
    <script>
        function lucas_number(n) {
            if (n === 0) {
                return 2;
            } else if (n === 1) {
                return 1;
            } else {
                return lucas_number(n - 1) + lucas_number(n - 2);
            }
        }

        function calculate() {
            var n = document.getElementById('inputN').value;
            var start_time = performance.now();
            var result = lucas_number(n);
            var process_time = performance.now() - start_time;
            document.getElementById('result').innerText = "Lucas数 L" + n + " = " + result;
            document.getElementById('time').innerText = "処理時間: " + (process_time / 1000).toFixed(3) + "秒";
        }
    </script>
```
---
index.html after
```
    <script>
        function sendRequest() {
            const n = document.getElementById('inputN').value;
            fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ n })
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('result').innerText = `Lucas数 L${n} = ${data.result}`;
                    document.getElementById('time').innerText = `処理時間: ${(data.process_time / 1000).toFixed(3)}秒`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    </script>
```
---
app.js before
```
const express = require('express');
const app = express();
const port = 3000; // Replace with your preferred port

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
```
---
app.js after
```
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

////////////////////////////////////////////////////////////////////
app.use(express.json()); // JSONデータを解析するために必要

app.post('/calculate', (req, res) => {
    const n = req.body.n;
    const start_time = performance.now();
    function lucas_number(n) {
        if (n === 0) {
            return 2;
        } else if (n === 1) {
            return 1;
        } else {
            return lucas_number(n - 1) + lucas_number(n - 2);
        }
    }
    const result = lucas_number(n);
    const process_time = performance.now() - start_time;
    res.json({ result, process_time });
});
////////////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
```
---
form before
```
<input type="number" id="inputN" min="1">
<button onclick="calculate()">計算実行</button>
```
---
form after
```
<input type="number" id="inputN" placeholder="Enter a number">
<button onclick="sendRequest()">Calculate</button>
```
---
