<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\Contracts\User\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, Auth $auth)
    {
        return response()->json($auth->register($request));
    }
    public function login(LoginRequest $request, Auth $auth)
    {
        return response()->json($auth->login($request));
    }
}
