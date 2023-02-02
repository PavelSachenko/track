<?php

namespace App\Repositories\Contracts\User;

use App\Http\Requests\Auth\RegisterRequest;
use Eloquent;
use Illuminate\Database\Eloquent\Model;

interface AuthRepo
{
    public function createUser(string $email, string $password): Eloquent|Model;
    public function getOne(string $email): Eloquent|Model;
}
