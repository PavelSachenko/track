<?php

namespace App\Repositories\Contracts\User;

interface ISettingsRepo
{
    public function update(int $userID, int $userType, array $paramsForUpdate): bool;
}
