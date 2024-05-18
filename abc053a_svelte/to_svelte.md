# svelte
 
### App.svelte の全面書き換えonly

```
<h1>abc053a</h1>
<p>
    すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
</p>

<script>
    let rate = 1200;

    function handleSubmit(event) {
        event.preventDefault();
        const N = parseInt(rate);
        const ANS = N < 1200 ? "ABC" : "ARC";
        alert("RATE: " + N + "\nCONTEST: " + ANS);
    }
</script>

<form on:submit={handleSubmit}>
    <label for="N">Select your rate:</label>
    <input type="range" bind:value={rate} min="0" max="5000" required>
    <span>{rate}</span> <!-- Span to display selected value -->
    <br>
    <input type="submit" value="Submit">
</form>

<p id="output"></p>

```

### script part before
```
    <script>
        var slider = document.getElementById('N');
        var output = document.getElementById('rateValue');
        output.innerHTML = slider.value;

        slider.oninput = function () {
            output.innerHTML = this.value;
        };

        document.getElementById('squareForm').addEventListener('submit', function (event) {
            event.preventDefault();
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

### form part before
```
    <form id="squareForm">
        <label for="N">Select your rate:</label>
        <input type="range" name="N" id="N" min="0" max="5000" value="1200" required>
        <span id="rateValue">1200</span> <!-- Span to display selected value -->
        <br>
        <input type="submit" value="Submit">
    </form>
```
