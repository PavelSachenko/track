<?php

namespace App\Repositories\PostgreSql\User;

use App\Models\Agency;
use App\Models\Agent;
use App\Models\User;

class SettingsRepo implements \App\Repositories\Contracts\User\SettingsRepo
{
    public function update(int $userID, int $userType, array $paramsForUpdate): bool
    {
        return match ($userType) {
            1 => Agent::where('user_id', $userID)->update($paramsForUpdate),
            2 => Agency::where('user_id', $userID)->update($paramsForUpdate),
            default => false,
        };
    }
}
