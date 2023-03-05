<?php

namespace App\Enums;

use App\Models\User;

class AgencyEnum
{
    const LOCAL_EMAIL = 'agency@gmail.com';

    public static function localMainAgencyID(): int
    {
        return User::where('email', self::LOCAL_EMAIL)
            ->where('type', UserEnum::AGENCY)
            ->first()->id;
    }
}
