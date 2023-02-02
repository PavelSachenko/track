<?php

namespace App\Services\Contracts\User;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Database\Eloquent\Model;

interface Auth
{
    public function register(RegisterRequest $request): array;
    public function login(LoginRequest $request): array;
    public function logout();
}
