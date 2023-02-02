<?php

namespace App\Repositories\Contracts\User;

use App\Http\Requests\Auth\RegisterRequest;
use Eloquent;
use Illuminate\Database\Eloquent\Model;

interface AuthRepo
{
    public function createUser(string $email): Eloquent|Model;
    public function getOneByField(string $field, string $value): Eloquent|Model;
}