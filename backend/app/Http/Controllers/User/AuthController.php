<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\EmailRegistrationRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Services\Contracts\User\IAuth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function emailRegistration(EmailRegistrationRequest $request, IAuth $auth): JsonResponse
    {
        return response()->json($auth->registerWithEmail($request), Response::HTTP_CREATED);
    }

    public function validateEmailToken(ValidateEmailTokenRequest $request, IAuth $auth): JsonResponse
    {
        return response()->json($auth->validateRegistrationToken($request));
    }

    public function registration(RegistrationRequest $request, IAuth $auth): JsonResponse
    {
        return response()->json($auth->registrationConcreteUser($request), Response::HTTP_CREATED);
    }

    public function login(LoginRequest $request, IAuth $auth): JsonResponse
    {
        return response()->json($auth->login($request));
    }

    public function logout(Request $request, IAuth $auth): JsonResponse
    {
        return response()->json($auth->logout($request));
    }
}
