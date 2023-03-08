<?php

namespace App\Http\Controllers\User;

use App\Exceptions\InvalidTokenException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordEmailValidationRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Services\Contracts\User\IAuth;
use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\PersonalAccessToken;

class ResetPasswordController extends Controller
{

    private IAuth $auth;

    public function __construct(IAuth $auth)
    {
        $this->auth = $auth;
    }

    public function emailVerification(ResetPasswordEmailValidationRequest $request): JsonResponse
    {
        return response()->json($this->auth->sendResetPasswordToEmail($request->email));
    }

    public function tokenValidation(ValidateEmailTokenRequest $request): JsonResponse
    {
        return response()->json($this->auth->validateResetPasswordToken($request->token));
    }

    public function setNewPassword(ResetPasswordRequest $request): JsonResponse
    {
        $personalToken = $request->getPersonalAccessToken($request->token);

        return response()->json($this->auth->resetPassword(\Auth::user()->id, $personalToken, $request->password));
    }
}
