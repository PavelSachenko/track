<?php

namespace App\Enums;

use App\Models\User;

class AgentEnum
{
    public const LOCAL_EMAIL = 'agent@gmail.com';

    final public static function localMainAgentID(): int
    {
        return User::where('email', self::LOCAL_EMAIL)
            ->where('type', UserEnum::AGENT)
            ->first()->id;
    }
}
