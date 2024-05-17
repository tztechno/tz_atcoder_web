[not use docker]
[first install node]

--------------------------------------------------

brew install node

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

--------------------------------------------------

(base) shun_ishii@shunnoMacBook-puro atc_react % node -v
v20.9.0
(base) shun_ishii@shunnoMacBook-puro atc_react % npm -v
10.1.0

[node install completed]
--------------------------------------------------

npm install -g create-react-app

npx create-react-app my-app

[react install completed]

Success! Created my-app at /Users/shun_ishii/DockerProjects/atc_react/my-app
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd my-app
  npm start

Happy hacking!

Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.3.7:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
--------------------------------------------------
--------------------------------------------------

# my-app 作成

## app.jsを書き換える

## index.jsを書き換える

## npm start

--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
