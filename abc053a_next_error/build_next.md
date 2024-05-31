
```
npm install -g @nestjs/cli
nest new myapp
cd myapp
npm run start:dev

http://localhost:3000
```

```
app.service.tsの中にHello Worldの文字を発見

```

# create my app
```
project-name/
├── node_modules/
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
```
node -v
v20.13.1-->v18.20.3-->v20.14.0
manual install
```
```
cd myapp
npm run start

http://localhost:3000
```

### app向け新規ファイルの階層

├── pubkic/
│   └── index.html
├── src/
│   └── rate 
│        ├── rate.controller.ts
│        └── rate.service.ts

### error内容

```
RATE: 2676
CONTEST: {"message":"Cannot POST /rate","error":"Not Found","statusCode":404}
```
