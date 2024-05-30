
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
```

```
---
backend型
```
        <?php
        // PHP部分
        $N = 1200; // デフォルトのレート
        $ANS = ""; // デフォルトの結果
        
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $N = isset($_POST['N']) ? (int)$_POST['N'] : 1200; // フォームからのレートの取得
            $ANS = ($N < 1200) ? "ABC" : "ARC"; // 条件分岐
        }
        ?>
```
frontend型
```
       <?php
        // PHP部分
        if (isset($_POST['submit'])) {
            $N = isset($_POST['N']) ? (int)$_POST['N'] : 1200; // フォームからのレートの取得
            $ANS = ($N < 1200) ? "ABC" : "ARC"; // 条件分岐
            echo "RATE: " . $N . "<br>CONTEST: " . $ANS; // 結果の表示
        }
        ?>
```
---
