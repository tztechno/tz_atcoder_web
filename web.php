<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RateController;

Route::get('/', [RateController::class, 'index']);
Route::post('/', [RateController::class, 'store']);
