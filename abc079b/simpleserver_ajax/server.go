package main

import (
    "encoding/json"
    "net/http"
    "strconv"
    "time"
    "io/ioutil"
)

func lucas_number(n int) int {
    if n == 0 {
        return 2
    }
    if n == 1 {
        return 1
    }
    return lucas_number(n-1) + lucas_number(n-2)
}

func handler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" && r.URL.Path == "/calculate" {
        var data map[string]interface{}
        body, err := ioutil.ReadAll(r.Body)
        if err != nil {
            http.Error(w, "Invalid input", http.StatusBadRequest)
            return
        }
        err = json.Unmarshal(body, &data)
        if err != nil || data["n"] == nil {
            http.Error(w, "Invalid input", http.StatusBadRequest)
            return
        }

        n, err := strconv.Atoi(data["n"].(string))
        if err != nil {
            http.Error(w, "Invalid input", http.StatusBadRequest)
            return
        }

        start := time.Now()
        result := lucas_number(n)
        duration := time.Since(start).Milliseconds() // ミリ秒単位で計測

        response := map[string]interface{}{
            "result":       result,
            "process_time": duration, // ミリ秒単位の処理時間
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(response)
    } else if r.Method == "GET" && r.URL.Path == "/" {
        // index.htmlのサーバーへのリクエストを処理する
        http.ServeFile(w, r, "index.html")
    } else {
        http.NotFound(w, r)
    }
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8000", nil)
}


// go build server.go
// ./server
// http://127.0.0.1:8000/
// http://localhost:8000/

