<?php

namespace App\Repositories\PostgreSql\User;

use App\Enums\UserEnum;
use App\Exceptions\UnprocessableEntityException;
use App\Models\Agency;
use App\Models\Agent;
use App\Models\User;
use App\Repositories\Contracts\User\IAvatarSaverRepo;
use App\Repositories\Contracts\User\ISettingsRepo;

class SettingsRepo implements ISettingsRepo, IAvatarSaverRepo
{
    public function update(int $userID, int $userType, array $paramsForUpdate): bool
    {
        return match ($userType) {
            UserEnum::AGENT => (bool)Agent::where('user_id', $userID)->update($paramsForUpdate),
            UserEnum::AGENCY => (bool)Agency::where('user_id', $userID)->update($paramsForUpdate),
            default => false,
        };
    }

    public function saveAvatar(int $userID, int $userType, $avatarURL): bool
    {
        $table =  match ($userType) {
            UserEnum::AGENT => UserEnum::AGENT_TABLE,
            UserEnum::AGENCY => UserEnum::AGENCY_TABLE,
            default => throw new UnprocessableEntityException("User type not allowed. type: " . $userType)
        };

        return (bool)\DB::table($table)->where('user_id', $userID)->update(['img' => $avatarURL]);
    }
}
