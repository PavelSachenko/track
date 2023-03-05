<?php

namespace App\Repositories\Contracts\Agency;

interface InviteRepo
{
    public function createInviteRequest(string $userReceiverEmail, string $inviteMessage, string $token): int;

    public function getAllRequests(int $limit, int $offset, string $search): array;

    public function deleteInviteFollow(int $inviteID): bool;

    public function getOneRequest(int $id): array;
}
