<?php

namespace App\Repositories\Contracts\Agency;

interface InviteRepo
{
    public function createInviteRequest(string $userReceiverEmail, string $inviteMessage, string $token): bool;
}
