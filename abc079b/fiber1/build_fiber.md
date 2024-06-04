
# welcome-static表示-backend移管 の3steps 

---
```
go mod init example.com/myapp
go mod編集,fiber installが仕込まれる

cd myapp

go get
Fiber install 成功

go run main.go
http://127.0.0.1:3000 

# Hello world表示成功

```
your-project
├── go.mod
├── main.go 
├── go.sum 

```
---
# static htmlの表示
```
your-project
├── go.mod
├── main.go
├── public
│   └── index.html
└── ...
```
main.goの修正
cd myapp
go run main.go

---

# backend分離作業,失敗

# 全面やり直しを命じる

---
