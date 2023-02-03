<?php

use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\UserController;
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
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/test', [AuthController::class, 'test']);

    Route::post('/registration', [AuthController::class, 'registration']);
    Route::post('/login', [AuthController::class, 'login']);


    Route::post('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');;
    Route::prefix('/email')->group(function () {

        Route::post('/registration', [AuthController::class, 'emailRegistration']);
        Route::get('/validate-token', [AuthController::class, 'validateEmailToken'])->name('email.validate-token');


        Route::post('verify', [AuthController::class, 'verify'],);
    });
});

/*
|--------------------------------------------------------------------------
| api/user ...
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => '/user', 'middleware' => 'auth:sanctum'], function (){
    Route::get('', [UserController::class, 'index']);
});
