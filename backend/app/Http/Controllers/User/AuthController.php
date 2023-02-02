<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Mail\EmailVerificationMail;
use App\Models\User;
use App\Services\Contracts\User\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, Auth $auth)
    {
        return response()->json($auth->registerWithEmail($request));
    }
    public function login(LoginRequest $request, Auth $auth)
    {
        return response()->json($auth->login($request));
    }

    public function logout(Request $request, Auth $auth)
    {
        return response()->json($auth->logout($request));
    }
    public function test(Request $request)
    {
        return PersonalAccessToken::findToken($request->get('token'));
//        return response()->json($auth->logout($request));
    }

    public function me(Request $request, Response $response)
    {
        return "hello";
    }

    public function validateEmailToken(ValidateEmailTokenRequest $request, Auth $auth)
    {
        return response()->json($auth->validateToken($request));
    }
}
