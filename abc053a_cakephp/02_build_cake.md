-------------------------------------
-------------------------------------
% php -v
PHP 8.3.6 (cli) (built: Apr 10 2024 14:21:20) (NTS)

% composer -v
Composer version 2.6.5 2023-10-06 10:11:52

composer create-project cakephp/app my-cake-app

cd my-cake-app

bin/cake server

http://localhost:8765

-------------------------------------

cd my-cake-app

-------------------------------------

bin/cake bake controller Contests

src/controller/ContestsController.php新設される

ContestsController.php 全面書き換え

index.phoファイルをsrc/templates/Contestsディレクトリに作成します。

config/routes.phpに設定追加

-------------------------------------

bin/cake server

http://localhost:8765

-------------------------------------

cd my-cake-app
bin/cake cache clear_all
bin/cake server

-------------------------------------
-------------------------------------
-------------------------------------
-------------------------------------
