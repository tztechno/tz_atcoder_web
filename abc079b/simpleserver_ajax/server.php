<?php

// Function to calculate Lucas Number
function lucas_number($n) {
    if ($n == 0) return 2;
    if ($n == 1) return 1;
    return lucas_number($n - 1) + lucas_number($n - 2);
}

// Handle incoming request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/calculate') {
    // Read input data
    $input = json_decode(file_get_contents('php://input'), true);
    $n = intval($input['n']);
    
    // Calculate Lucas number and process time
    $start_time = microtime(true);
    $result = lucas_number($n);
    $end_time = microtime(true);
    $process_time = ($end_time - $start_time) * 1000;

    // Send response
    header('Content-Type: application/json');
    echo json_encode(['result' => $result, 'process_time' => $process_time]);
    exit;
}

// Serve index.html for root URL
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/') {
    readfile('index.html');
    exit;
}

// Return 404 for any other requests
header("HTTP/1.1 404 Not Found");
echo "Not Found";
exit;

# php -S localhost:8000 server.php
# http://localhost:8000

?>
