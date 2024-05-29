# difference

---
main.go after
```
func main() {
    router := gin.Default()

    router.LoadHTMLFiles("templates/index.tmpl")

    router.GET("/", func(c *gin.Context) {
        c.HTML(http.StatusOK, "index.tmpl", nil)
    })

    router.POST("/", func(c *gin.Context) {
        rateStr := c.PostForm("N")
        rate, err := strconv.Atoi(rateStr)
        if err != nil {
            rate = 1200
        }

        contest := "ARC"
        if rate < 1200 {
            contest = "ABC"
        }

        c.HTML(http.StatusOK, "index.tmpl", gin.H{
            "Rate":    rate,
            "Contest": contest,
        })
    })

    router.Run(":8080")
}
```
main.go before
```
func main() {
    r := gin.Default()

    // HTMLテンプレートのロード
    r.LoadHTMLGlob("templates/*")

    // ルートURLにアクセスするとHTMLを提供するエンドポイント
    r.GET("/", func(c *gin.Context) {
        // HTMLテンプレートをレンダリングしてクライアントに送信
        c.HTML(200, "index.tmpl", gin.H{
            "title": "Main website",
        })
    })

    r.GET("/index", func(c *gin.Context) {
        c.HTML(200, "index.tmpl", gin.H{
            "title": "Main website",
        })
    })

    r.Run() // デフォルトでは ":8080" でリッスン
}
```
---
index.tmpl after
```
    <script>
        var slider = document.getElementById('N');
        var output = document.getElementById('rateValue');

        output.innerHTML = slider.value;

        slider.oninput = function () {
            output.innerHTML = this.value;
        };
    </script>
```
index.tmpl before 
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

// to be transfered to main.go

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
