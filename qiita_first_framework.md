# svelte
 
### App.svelteの全面書き換え、だけ

```
<script>
    let rate = 1200;

    function handleSubmit(event) {
        event.preventDefault();
        const N = parseInt(rate);
        const ANS = N < 1200 ? "ABC" : "ARC";
        alert("RATE: " + N + "\nCONTEST: " + ANS);
    }
</script>

<style>
    /* Add your styles here */
</style>

<h1>abc053a</h1>
<p>
    すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
</p>

<form on:submit={handleSubmit}>
    <label for="N">Select your rate:</label>
    <input type="range" bind:value={rate} min="0" max="5000" required>
    <span>{rate}</span> <!-- Span to display selected value -->
    <br>
    <input type="submit" value="Submit">
</form>

<p id="output"></p>


```
