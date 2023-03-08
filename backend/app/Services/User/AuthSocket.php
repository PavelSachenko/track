<?php

namespace App\Services\User;

class AuthSocket implements \App\Services\Contracts\User\IAuthSocket
{
    public function authUser(int $userID, array $userInfo): string
    {
    }

    public function authChannel(string $channelName, int $userID, array $userInfo): string
    {
    }
}
