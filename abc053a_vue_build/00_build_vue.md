
-------------------------------------------------------

brew install node

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

source ~/.bashrc

nvm install node

-------------------------------------------------------
[result]
Your user’s .npmrc file (${HOME}/.npmrc)
has a `globalconfig` and/or a `prefix` setting, which are incompatible with nvm.
Run `nvm use --delete-prefix v22.1.0` to unset it.

% node -v
v22.1.0
% npm -v
10.7.0
% nvm --version
0.39.2

-------------------------------------------------------
[challenge]
npm install -g @vue/cli

-------------------------------------------------------
[result]
% vue --version
zsh: command not found: vue

-------------------------------------------------------
% npm root -g 
/Users/shun_ishii/.npm-global/lib/node_modules

-------------------------------------------------------
[challenge]
npm cache clean --force
npm install -g @vue/cli

exec $SHELL -l

vue --version

-------------------------------------------------------
[result]
% vue --version
zsh: command not found: vue

-------------------------------------------------------
[challenge]
npm config get prefix
[result]/Users/shun_ishii/.npm-global

-------------------------------------------------------
nano ~/.zshrc
[result]
  UW PICO 5.09                                      File: /Users/shun_ishii/.zshrc                                         


#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="/Users/shun_ishii/.sdkman"
[[ -s "/Users/shun_ishii/.sdkman/bin/sdkman-init.sh" ]] && source "/Users/shun_ishii/.sdkman/bin/sdkman-init.sh"

# environment paths　20201117
export PATH="$PATH:$HOME/.local/bin"export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"

^G Get Help         ^O WriteOut         ^R Read File        ^Y Prev Pg          ^K Cut Text         ^C Cur Pos          
^X Exit             ^J Justify          ^W Where is         ^V Next Pg          ^U UnCut Text       ^T To Spell      

-------------------------------------------------------
export PATH="$HOME/.npm-global/bin:$PATH"
追加保存反映
source ~/.zshrc

-------------------------------------------------------
npm uninstall -g @vue/cli
npm install -g @vue/cli

-------------------------------------------------------
+ @vue/cli@5.0.8
added 851 packages from 500 contributors in 27.655s
-------------------------------------------------------
% vue --version
@vue/cli 5.0.8
[install success]

-------------------------------------------------------
vue create my-vue-app

Vue CLI v5.0.8
? Please pick a preset: Default ([Vue 3] babel, eslint)
? Pick the package manager to use when installing dependencies: Yarn

-------------------------------------------------------
 $ cd my-vue-app
 $ yarn serve
 
-------------------------------------------------------
  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.3.7:8080/

  Note that the development build is not optimized.
  To create a production build, run yarn build.
  
-------------------------------------------------------
-------------------------------------------------------
[how to create my app]
追加
src/components/ContestForm.vue
書き換え
src/App.vue
npm run build

-------------------------------------------------------

# deploy resulted in failure

-------------------------------------------------------
-------------------------------------------------------
-------------------------------------------------------
