<?php
require __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();

// Hello route
$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Hello, world!");
    return $response;
});

// AJAX route
$app->post('/ajax', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();
    $name = $data['name'] ?? 'Guest';
    $response->getBody()->write("Hello, " . $name);
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
