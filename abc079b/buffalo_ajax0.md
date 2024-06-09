GoのBuffaloフレームワークを使用して、ルーカス数を計算するバックエンドを作成し、AJAX経由で通信する方法について説明します。

まず、Goの開発環境がインストールされていることを確認します。次に、Buffaloをインストールし、プロジェクトを作成します。

1. **Buffaloのインストール**
    ```bash
    go install github.com/gobuffalo/cli/cmd/buffalo@latest
    ```

2. **プロジェクトの作成**
    ```bash
    buffalo new lucas_calculator
    cd lucas_calculator
    ```

3. **`ajax.html`を配置**
    `templates`ディレクトリに`ajax.html`を作成し、あなたの提供したHTMLを貼り付けます。

4. **ハンドラの作成**
    `actions`ディレクトリの中に`home.go`ファイルを作成し、以下のように設定します。

    ```go
    package actions

    import (
        "encoding/json"
        "net/http"
        "time"

        "github.com/gobuffalo/buffalo"
    )

    // HomeHandler serves the home page with the AJAX form.
    func HomeHandler(c buffalo.Context) error {
        return c.Render(http.StatusOK, r.HTML("ajax.html"))
    }

    // LucasHandler calculates the Lucas number and returns the result.
    func LucasHandler(c buffalo.Context) error {
        var requestData struct {
            N int `json:"n"`
        }

        if err := c.Bind(&requestData); err != nil {
            return c.Render(http.StatusBadRequest, r.JSON(map[string]string{"error": "invalid input"}))
        }

        start := time.Now()
        result := lucasNumber(requestData.N)
        elapsed := time.Since(start)

        responseData := map[string]interface{}{
            "result":      result,
            "process_time": elapsed.Milliseconds(),
        }

        return c.Render(http.StatusOK, r.JSON(responseData))
    }

    // Lucas number calculation
    func lucasNumber(n int) int {
        if n == 0 {
            return 2
        }
        if n == 1 {
            return 1
        }
        return lucasNumber(n-1) + lucasNumber(n-2)
    }
    ```

5. **ルーティングの設定**
    `actions/app.go`ファイルを以下のように修正します。

    ```go
    package actions

    import (
        "github.com/gobuffalo/buffalo"
    )

    func App() *buffalo.App {
        app := buffalo.Automatic(buffalo.Options{
            Env:         ENV,
            SessionName: "_lucas_calculator_session",
        })

        app.GET("/", HomeHandler)
        app.POST("/calculate", LucasHandler)

        return app
    }
    ```

6. **依存関係のインストールとサーバーの起動**
    ```bash
    buffalo dev
    ```

この設定により、`http://localhost:3000`にアクセスすると、提供された`ajax.html`が表示され、フォームに入力した数値を元にAJAX経由でバックエンドにリクエストを送り、ルーカス数の計算結果と実行時間が表示されます。

これで、GoのBuffaloフレームワークを使用したバックエンドとAJAXを利用したフロントエンドの連携が完成です。