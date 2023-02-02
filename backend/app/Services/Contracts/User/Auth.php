<?php

namespace App\Services\Contracts\User;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

interface Auth
{
    public function registerWithEmail(RegisterRequest $request): bool;
    public function login(LoginRequest $request): array;
    public function logout(Request $request): bool;

    public function validateToken(ValidateEmailTokenRequest $request): string;
}
