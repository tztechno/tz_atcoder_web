[not use docker]
[first install node]

--------------------------------------------------

brew install node

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

--------------------------------------------------

% node -v
v20.9.0
% npm -v
10.1.0

[node install completed]

--------------------------------------------------

npm install -g create-react-app

[until here same operation]

--------------------------------------------------

npx create-next-app my-next-app

cd my-next-app

開発サーバーの起動:
npm run dev

プロダクションビルドの作成とサーバーの起動:
npm run build
npm start

--------------------------------------------------
--------------------------------------------------
START MY APP

--------------------------------------------------
pages/index.js じゃなく app/page.js ファイルを以下のコードで置き換えます

npm run dev

http://localhost:3000

--------------------------------------------------
--------------------------------------------------
--------------------------------------------------