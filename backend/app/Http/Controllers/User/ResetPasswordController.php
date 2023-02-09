<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordEmailValidationRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Services\Contracts\User\Auth;

class ResetPasswordController extends Controller
{

    private Auth $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function emailVerification(ResetPasswordEmailValidationRequest $request)
    {
        return response()->json($this->auth->sendResetPasswordToEmail($request));
    }

    public function tokenValidation(ValidateEmailTokenRequest $request)
    {
        return response()->json($this->auth->validateResetPasswordToken($request));
    }

    public function setNewPassword(ResetPasswordRequest $request)
    {
        return response()->json($this->auth->resetPassword($request));
    }
}
