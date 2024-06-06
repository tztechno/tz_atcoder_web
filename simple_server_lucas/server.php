<?php
if (file_exists(__DIR__ . '/index.html')) {
    echo file_get_contents(__DIR__ . '/index.html');
} else {
    echo "404 Not Found";
}

# php -S localhost:8000 -t public
# http://127.0.0.1:8000/
# http://localhost:8000


#/my_project
#    /public
#        index.html
#        server.php

?>
