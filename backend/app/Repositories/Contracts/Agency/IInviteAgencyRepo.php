<?php

namespace App\Repositories\Contracts\Agency;

use App\DTO\User\Agency\Follows\AllInvitesSearchDTO;

interface IInviteAgencyRepo
{
    public function createInviteRequest(int $userID, string $userReceiverEmail, string $inviteMessage = null): int;

    public function allInvites(AllInvitesSearchDTO $allInvitesSearchDTO): array;

    public function deleteInviteFollow(int $userID, int $inviteID): bool;

    public function oneRequest(int $id): array;
}
