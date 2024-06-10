

まず、.NET Core SDKをインストールしておいてください。

1. **プロジェクトの作成**: コンソール（ターミナル）を開き、新しいディレクトリを作成し、そのディレクトリに移動します。

```bash
mkdir MyApp
cd MyApp
```

2. **プロジェクトの初期化**: 以下のコマンドを使用して、新しい.NET Core Webアプリケーションのプロジェクトを初期化します。

```bash
cd MyApp
dotnet new web
```

3. **Nancyのインストール**: 以下のコマンドを使用して、Nancyパッケージをプロジェクトに追加します。

```bash
dotnet add package Nancy
```

6. **実行**: コンソールでプロジェクトのディレクトリに移動し、以下のコマンドを実行してアプリケーションを起動します。

```bash
dotnet run
```

これで、Nancyを使用した"Hello, World!"のWebアプリケーションが起動し、`http://localhost:5000/` にアクセスすると表示されるはずです。

$ ここまでは成功

---

以下はプロジェクト内のファイルをどのように編集するかに関する具体的な手順です。

1. **HTMLファイルの追加**:
   - プロジェクトのルートディレクトリに、指定されたHTMLコードを含む `index.html` ファイルを作成します。

2. **Nancyモジュールの編集**:
   - ロジェクトのルートに新しいC#ファイル `lucasModule.cs` を作成します。
   - `/calculate` エンドポイントを追加します。

   ```csharp
using Nancy;
using System.Diagnostics;

public class LucasModule : NancyModule
{
    public LucasModule()
    {
        Post("/calculate", args =>
        {
            var requestData = this.Bind<LucasNumberRequest>(); // JSONデータをモデルにバインド
            var n = requestData.N;
            
            // Lucas数の計算
            var result = CalculateLucasNumber(n);

            // レスポンスを返す
            return Response.AsJson(new
            {
                result = result,
                process_time = Stopwatch.GetTimestamp() // 実行時間を計測
            });
        });
    }

    // Lucas数を計算するメソッド
    private int CalculateLucasNumber(int n)
    {
        if (n == 0)
            return 2;
        if (n == 1)
            return 1;

        int a = 2, b = 1, c = 0;
        for (int i = 2; i <= n; i++)
        {
            c = a + b;
            a = b;
            b = c;
        }
        return c;
    }
}

// JSONリクエスト用のモデルクラス
public class LucasNumberRequest
{
    public int N { get; set; }
}

これで、`index.html` が表示され、"Calculate" ボタンがAjaxリクエストを送信し、Lucas数が計算されて表示されるようになります。


dotnet add package Nancy
dotnet add package Nancy.Hosting.Aspnet

cd MyApp
dotnet run

`http://localhost:5000/calculate`
`http://localhost:5000`

```
MyNancyApp/
│
├── LucasModule.cs
├── Program.cs
├── index.html
└── MyNancyApp.csproj
```