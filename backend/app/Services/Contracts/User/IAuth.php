<?php

namespace App\Services\Contracts\User;

use App\DTO\User\RegistrationUserDTO;
use Illuminate\Http\UploadedFile;
use Laravel\Sanctum\PersonalAccessToken;

interface IAuth
{
    public function registerWithEmail(string $email): bool;

    public function registrationConcreteUser(RegistrationUserDTO $registrationUserDTO, PersonalAccessToken $token, ?UploadedFile $photo = null): array;

    public function login(string $email, string $password): array;

    public function logout(string $bearerToken): bool;

    public function validateRegistrationToken(string $token): string;

    public function validateResetPasswordToken(string $token): bool;

    public function sendResetPasswordToEmail(string $email): bool;

    public function resetPassword(int $userID, PersonalAccessToken $token, string $password): array;
}
