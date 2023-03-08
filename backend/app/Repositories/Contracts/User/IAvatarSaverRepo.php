<?php

namespace App\Repositories\Contracts\User;

interface IAvatarSaverRepo
{
    public function saveAvatar(int $userID, int $userType, $avatarURL);
}
