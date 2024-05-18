---

% php -v
PHP 8.3.6 (cli) (built: Apr 10 2024 14:21:20) (NTS)

% composer -v
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 2.6.5 2023-10-06 10:11:52

---

composer create-project --prefer-dist laravel/laravel my-laravel-app

sucess!

---

cd my-laravel-app
php artisan serve

---

INFO  Server running on [http://127.0.0.1:8000].  

  Press Ctrl+C to stop the server

---
---

データベースの設定：.envファイルを編集して、データベースの設定を行います。
例えば、MySQLを使用する場合は以下のように設定します。

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

---

php artisan migrate

---
---
# create my-app

routes/web.php に新しいルートを追加します。

php artisan make:controller RateController
app/Http/Controllers/RateController.php を作成
app/Http/Controllers/Controller.php は削除しない
resources/views/rate.blade.phpファイルを作成

cd my-laravel-app
composer install
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

php artisan serve

INFO  Server running on [http://127.0.0.1:8000].  
---

include(/Users/shun_ishii/.Trash/my-laravel-app/vendor/composer/../../app/Http/Controllers/Controller.php): Failed to open stream: No such file or directory

include(/Users/shun_ishii/DockerProjects/0atc_laravel_cake_copy/my-laravel-app/vendor/composer/../../app/Http/Controllers/Controller.php): Failed to open stream: No such file or directory

Class "App\Http\Controllers\Controller" not found

---
---