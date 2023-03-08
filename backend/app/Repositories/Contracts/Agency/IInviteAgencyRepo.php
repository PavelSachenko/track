<?php

namespace App\Repositories\Contracts\Agency;

interface IInviteAgencyRepo
{
    public function createInviteRequest(string $userReceiverEmail, string $inviteMessage, string $token): int;

    public function allRequests(int $limit, int $offset, string $search): array;

    public function deleteInviteFollow(int $inviteID): bool;

    public function oneRequest(int $id): array;
}
