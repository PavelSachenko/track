<?php

use App\Events\TestEvent;
use App\Http\Controllers\Agent\ScheduleController;
use App\Http\Controllers\Agent\Settings\ScheduleController as SettingScheduleController;
use App\Http\Controllers\Agent\SubscriptionController as AgentSubscriptionController;
use App\Http\Controllers\Agency\SubscriptionController as AgencySubscriptionController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ResetPasswordController;
use App\Http\Controllers\User\SettingsController;
use App\Http\Controllers\User\SocketController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Agency\ScheduleController as AgencyScheduleController;

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
| api/auth/reset-password ...
| api/auth/socket ...
|--------------------------------------------------------------------------
*/
Route::prefix('/auth')->group(function (){
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('registration', [AuthController::class, 'registration']);
    Route::post('login', [AuthController::class, 'login']);

    Route::prefix('/email')->group(function () {
        Route::post('registration', [AuthController::class, 'emailRegistration']);
        Route::get('validate-token', [AuthController::class, 'validateEmailToken'])->name('email.validate-token');
    });

    Route::prefix('/reset-password')->group(function (){
        Route::post('send-email-verification', [ResetPasswordController::class, 'emailVerification'])->name('reset-password.email');
        Route::get('token-validation', [ResetPasswordController::class, 'tokenValidation']);
        Route::put('set-new-password', [ResetPasswordController::class, 'setNewPassword']);
    });

    Route::group(['prefix' => 'socket', 'middleware' => 'auth:sanctum'], function (){
        Route::post('registration-channel', [SocketController::class, 'registrationChannel']);
        Route::post('set-user-connection', [SocketController::class, 'setUserConnection']);
    });
});

/*
|--------------------------------------------------------------------------
| api/user ...
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => '/user', 'middleware' => 'auth:sanctum'], function (){
    Route::get('', [UserController::class, 'index']);
    Route::patch('update', [SettingsController::class, 'update']);
    Route::post('update-avatar', [SettingsController::class, 'updateAvatar']);
    Route::put('update-password', [SettingsController::class, 'updatePassword']);
});

/*
|--------------------------------------------------------------------------
| api/agent ...
| api/agent/subscription ...
|
| api/agent/settings:
| api/agent/settings/schedule ...
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => '/agent', 'middleware' => ['auth:sanctum', 'agent']], function (){

    Route::prefix('/subscription')->group(function (){
        Route::post('accept', [AgentSubscriptionController::class, 'accept']);
        Route::patch('decline', [AgentSubscriptionController::class, 'decline']);

        Route::get('count-followers', [AgentSubscriptionController::class, 'countFollowers']);
        Route::get('followers', [AgentSubscriptionController::class, 'followers']);
        Route::get('count-requests', [AgentSubscriptionController::class, 'countRequests']);
        Route::get('requests', [AgentSubscriptionController::class, 'requests']);
    });


    Route::prefix('/schedule')->group(function (){
        Route::get('/', [ScheduleController::class, 'index']);
        Route::post('/add-work-record', [ScheduleController::class, 'add']);
        Route::delete('/drop-work-record/{id}', [ScheduleController::class, 'drop'])->where(['id' => '[0-9]+']);
        Route::put('/update-work-record/{id}', [ScheduleController::class, 'update'])->where(['id' => '[0-9]+']);
    });


    Route::prefix('/settings')->group(function (){
        Route::prefix('/schedule')->group(function (){
            Route::get('work-time', [SettingScheduleController::class, 'getWorkTime']);
            Route::patch('set-working-status', [SettingScheduleController::class, 'setWorkStatus']);
            Route::patch('set-work-time', [SettingScheduleController::class, 'setWorkTime']);
        });
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
        Route::get('requests', [AgencySubscriptionController::class, 'requests']);

        Route::delete('unsubscribe/{id}', [AgencySubscriptionController::class, 'unsubscribe'])->where(['id' => '[0-9]+']);
        Route::delete('invite/{id}', [AgencySubscriptionController::class, 'inviteDelete'])->where(['id' => '[0-9]+']);
    });

    Route::prefix('/schedule')->group(function (){
        Route::get('/', function (){
            $test = new Test();
            $test->test = 'asdasd';
            newTest($test);
            dd($test);
        });
//        Route::get('/', [AgencyScheduleController::class, 'index']);
    });

});

function newTest(Test $test)
{
    $test->test = "loh";
}

class Test
{
    public string $test = "";
}
