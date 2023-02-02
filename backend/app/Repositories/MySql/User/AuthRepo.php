<?php

namespace App\Repositories\MySql\User;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class AuthRepo implements \App\Repositories\Contracts\User\AuthRepo
{
    public function createUser(string $email): \Eloquent|Model
    {
        return User::create([
            'email' => $email,
        ]);
    }
    public function getOneByField(string $field, string $value): \Eloquent|Model
    {
        return User::where($field, $value)->firstOrFail();
    }

}
