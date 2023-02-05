<?php

use App\Http\Controllers\Agent\SubscriptionController as AgentSubscriptionController;
use App\Http\Controllers\Agency\SubscriptionController as AgencySubscriptionController;
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
| api/agent ...
| api/agent/subscription ...
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => '/agent', 'middleware' => ['auth:sanctum', 'agent']], function (){

    Route::prefix('/subscription')->group(function (){
        Route::post('accept', [AgentSubscriptionController::class, 'accept']);
        Route::patch('decline', [AgentSubscriptionController::class, 'decline']);

        Route::get('count-followers', [AgentSubscriptionController::class, 'countFollowers']);
        Route::get('followers', [AgentSubscriptionController::class, 'followers']);
        Route::get('count-requests', [AgentSubscriptionController::class, 'countRequests']);
    });

});

/*
|--------------------------------------------------------------------------
| api/agency ...
| api/agency/subscription ...
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => '/agency', 'middleware' => ['auth:sanctum', 'agency']], function (){
    Route::prefix('/subscription')->group(function (){
        Route::post('send-request', [AgencySubscriptionController::class, 'sendRequest']);

        Route::get('count-follows', [AgencySubscriptionController::class, 'countFollows']);
        Route::get('count-requests', [AgencySubscriptionController::class, 'countRequests']);
        Route::get('follows', [AgencySubscriptionController::class, 'follows']);
    });

});
