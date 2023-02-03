<?php

namespace App\Services\Contracts\User;

use App\Http\Requests\Auth\EmailRegistrationRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Http\Requests\Auth\RegistrationRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

interface Auth
{
    public function registerWithEmail(EmailRegistrationRequest $request): bool;
    public function registrationConcreteUser(RegistrationRequest $request): array;
    public function login(LoginRequest $request): array;
    public function logout(Request $request): bool;

    public function validateToken(ValidateEmailTokenRequest $request): string;
}
