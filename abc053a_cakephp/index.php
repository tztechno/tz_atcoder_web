<!-- src/Template/Contests/index.ctp -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>abc077b</title>
</head>

<body>
    <h1>abc053a</h1>
    <p>
        すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
    </p>
    <?= $this->Form->create(null, ['id' => 'squareForm']) ?>
        <label for="N">Select your rate:</label>
        <?= $this->Form->input('N', ['type' => 'range', 'min' => '0', 'max' => '5000', 'value' => '1200', 'required' => true, 'id' => 'N']) ?>
        <span id="rateValue">1200</span> <!-- Span to display selected value -->
        <br>
        <?= $this->Form->button('Submit') ?>
    <?= $this->Form->end() ?>

    <p id="output">
        <?php if (isset($rate) && isset($contest)): ?>
            RATE: <?= h($rate) ?><br>
            CONTEST: <?= h($contest) ?>
        <?php endif; ?>
    </p>

    <script>
        // JavaScriptの部分はそのまま残します
        var slider = document.getElementById('N');
        var output = document.getElementById('rateValue');

        output.innerHTML = slider.value;

        slider.oninput = function () {
            output.innerHTML = this.value;
        };
    </script>

</body>

</html>
