
go version
go version go 1.22.3 darwin/amd64

go mod init gin-sample

cd gin-sample

go get -u github.com/gin-gonic/gin

go get -u io/fs

go run main.go

---

% go run main.go
[GIN-debug] Listening and serving HTTP on :8080

---

http://localhost:8080/ping

{"message":"pong"}

---
ginのwebappだがindex.tmplのscriptの中で、
logic部分（atcoderの解の部分）をgoにする

cd gin-sample

go run main.go

http://localhost:8080

http://localhost:8080/index

---
