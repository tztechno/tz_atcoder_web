// go build server.go
// ./server
// http://127.0.0.1:8000/
// go run server.go

package main

import (
    "io/ioutil"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path == "/" {
        content, err := ioutil.ReadFile("index.html")
        if err != nil {
            http.Error(w, "Could not read file", http.StatusInternalServerError)
            return
        }
        w.Header().Set("Content-Type", "text/html")
        w.Write(content)
    } else {
        http.NotFound(w, r)
    }
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8000", nil)
}
