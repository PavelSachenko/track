<?php

namespace App\Services\Contracts\User;

interface IAuthSocket
{
    public function authUser(int $userID, array $userInfo): string;

    public function authChannel(string $channelName, int $userID, array $userInfo): string;
}
