package main

import (
    "github.com/gin-gonic/gin"
)

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
