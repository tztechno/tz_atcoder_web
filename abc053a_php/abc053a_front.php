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
    <form id="squareForm" method="post">
        <label for="N">Select your rate:</label>
        <input type="range" name="N" id="N" min="0" max="5000" value="1200" required>
        <span id="rateValue">1200</span> <!-- Span to display selected value -->
        <br>
        <input type="submit" name="submit" value="Submit">
    </form>

    <p id="output">
        <?php
        // PHP部分
        if (isset($_POST['submit'])) {
            $N = isset($_POST['N']) ? (int)$_POST['N'] : 1200; // フォームからのレートの取得
            $ANS = ($N < 1200) ? "ABC" : "ARC"; // 条件分岐
            echo "RATE: " . $N . "<br>CONTEST: " . $ANS; // 結果の表示
        }
        ?>
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