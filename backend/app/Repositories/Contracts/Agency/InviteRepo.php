<?php

namespace App\Repositories\Contracts\Agency;

interface InviteRepo
{
    public function createInviteRequest(string $userReceiverEmail, string $inviteMessage, string $token): bool;

    public function getAllRequests(int $limit, int $offset, string $search): array;

    public function deleteInviteFollow(int $inviteID): bool;
}
