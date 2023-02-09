<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordEmailValidationRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;

class ResetPasswordController extends Controller
{
    public function emailVerification(ResetPasswordEmailValidationRequest $request)
    {

    }

    public function tokenValidation(ValidateEmailTokenRequest $request)
    {

    }

    public function setNewPassword(ResetPasswordRequest $request)
    {

    }
}
