<?php

use App\Http\Controllers\User\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

/*
|--------------------------------------------------------------------------
| api/auth ...
| api/auth/email ...
|--------------------------------------------------------------------------
*/
Route::prefix('/auth')->group(function (){
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/test', [AuthController::class, 'test']);

    Route::post('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');;
    Route::prefix('/email')->group(function () {
        Route::post('verify', [AuthController::class, 'verify'],);
        Route::get('validate-token', [AuthController::class, 'validateEmailToken'])->name('email.validate-token');
    });
});
