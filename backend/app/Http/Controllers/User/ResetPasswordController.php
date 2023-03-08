<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordEmailValidationRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Services\Contracts\User\IAuth;
use Illuminate\Http\JsonResponse;

class ResetPasswordController extends Controller
{

    private IAuth $auth;

    public function __construct(IAuth $auth)
    {
        $this->auth = $auth;
    }

    public function emailVerification(ResetPasswordEmailValidationRequest $request): JsonResponse
    {
        return response()->json($this->auth->sendResetPasswordToEmail($request));
    }

    public function tokenValidation(ValidateEmailTokenRequest $request): JsonResponse
    {
        return response()->json($this->auth->validateResetPasswordToken($request));
    }

    public function setNewPassword(ResetPasswordRequest $request): JsonResponse
    {
        return response()->json($this->auth->resetPassword($request));
    }
}
