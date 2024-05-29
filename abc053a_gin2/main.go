
package main

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
)

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
