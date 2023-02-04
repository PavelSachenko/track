<?php

use App\Http\Controllers\Agent\SubscriptionController as AgentSubscriptionController;
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

/*
|--------------------------------------------------------------------------
| api/auth ...
| api/auth/email ...
|--------------------------------------------------------------------------
*/
Route::prefix('/auth')->group(function (){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/registration', [AuthController::class, 'registration']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::prefix('/email')->group(function () {
        Route::post('/registration', [AuthController::class, 'emailRegistration']);
        Route::get('/validate-token', [AuthController::class, 'validateEmailToken'])->name('email.validate-token');
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

/*
|--------------------------------------------------------------------------
| api/agent/
| api/agent/subscription
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => '/agent', 'middleware' => 'auth:sanctum'], function (){

    Route::prefix('/subscription')->group(function (){
        Route::get('count-followers', [AgentSubscriptionController::class, 'countFollowers']);
        Route::get('followers', [AgentSubscriptionController::class, 'followers']);
        Route::get('count-requests', [AgentSubscriptionController::class, 'countRequests']);
    });

});
