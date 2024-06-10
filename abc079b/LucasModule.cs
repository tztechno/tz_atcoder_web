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
