<?php

namespace App\Repositories\Contracts\User;

use App\Http\Requests\Auth\RegisterRequest;
use Eloquent;
use Illuminate\Database\Eloquent\Model;

interface IAuthRepo
{
    public function createEmptyUserWithEmail(string $email): Eloquent|Model;

    public function createSpecialUserAndSetPassword(int $userID, int $userType, array $params): Eloquent|Model;

    public function oneByField(string $field, $value): Eloquent|Model;

    public function setValidatedEmail(string $token): string;

    public function createNewPassword(int $userID, string $password): bool;
}
