<?php

namespace App\Repositories\Contracts\User;

use App\DTO\User\RegistrationUserDTO;
use Eloquent;
use Illuminate\Database\Eloquent\Model;

interface IAuthRepo
{
    public function createEmptyUserWithEmail(string $email): Eloquent|Model;

    public function createSpecialUserAndSetPassword(RegistrationUserDTO $registrationUserDTO, ?string $img = null): Eloquent|Model;

    public function oneByField(string $field, $value): Eloquent|Model;

    public function setValidatedEmail(string $token): string;

    public function createNewPassword(int $userID, string $password): bool;
}
