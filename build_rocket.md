```
cargo new my_proj

cargo.toml中に記載
[dependencies]
rocket = "0.5.0-rc.1"

cd my_proj
cargo build

main.rs書き換え

cd my_proj
cargo run



http://127.0.0.1:8080
```
```
デプロイ1
index.htmlそのまま
main.rs書き換え

my_proj/
├── Cargo.toml
├── src/
│   └── main.rs
└── index.html
└── static/
    └── (静的ファイル)


cd my_proj
cargo build
cargo run

http://127.0.0.1:8080



```