<?php
require __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Exception\HttpBadRequestException;

$app = AppFactory::create();

$app->addRoutingMiddleware();
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello, world!");
    return $response;
});

// Lucas number calculation
$app->post('/calculate', function (Request $request, Response $response, $args) {
    $data = json_decode($request->getBody()->getContents(), true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new HttpBadRequestException($request, 'Invalid JSON');
    }

    $n = intval($data['n']);
    
    // Start timing
    $startTime = microtime(true);
    
    // Calculate the Lucas number
    $result = calculateLucasNumber($n);
    
    // End timing
    $endTime = microtime(true);
    $processTime = ($endTime - $startTime) * 1000; // Convert to milliseconds

    $responseData = [
        'result' => $result,
        'process_time' => $processTime
    ];

    $response->getBody()->write(json_encode($responseData));
    return $response->withHeader('Content-Type', 'application/json');
});

function calculateLucasNumber($n) {
    if ($n == 0) return 2;
    if ($n == 1) return 1;
    return calculateLucasNumber($n - 1) + calculateLucasNumber($n - 2);
}

$app->run();
