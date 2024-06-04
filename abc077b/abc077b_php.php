<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>abc077b</title>
</head>
<body>
<h1>abc077b</h1>
<p>
    N以下の平方数のうち、最大のものを求めてください。ただし、平方数とは、ある整数の2乗として表せる整数のことを指します。
</p>
<form method="post">
    <label for="N">Enter N:</label>
    <input type="text" name="N" id="N" required>
    <br>
    <input type="submit" value="Submit">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $N = $_POST["N"];
    #$N = trim(fgets(STDIN));
    $M = intval(sqrt($N));
    $ANS = $M * $M;

    echo "<p>INPUT: " . htmlspecialchars($N) . "</p>";
    echo "<p>OUTPUT: " . htmlspecialchars($ANS) . "</p>";
}
?>

</body>
</html>
