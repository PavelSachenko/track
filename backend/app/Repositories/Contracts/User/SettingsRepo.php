<?php

namespace App\Repositories\Contracts\User;

interface SettingsRepo
{
    public function update(int $userID, int $userType, array $paramsForUpdate): bool;
}
