<?php

namespace App\Repositories\MySql\User;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class AuthRepo implements \App\Repositories\Contracts\User\AuthRepo
{
    public function createUser(string $email, string $password): \Eloquent|Model
    {
        return User::create([
            'email' => $email,
            'password' => Hash::make($password),
        ]);
    }
}
