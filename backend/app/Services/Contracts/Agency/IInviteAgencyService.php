<?php

namespace App\Services\Contracts\Agency;

use App\DTO\User\Agency\Follows\AllInvitesSearchDTO;
use App\Http\Requests\Agency\Subscription\AllAgencyInvitesRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;

interface IInviteAgencyService
{
    public function sendInvite(int $userID, string $email, string $message = null): bool;

    public function allInvites(AllInvitesSearchDTO $allInvitesSearchDTO): array;

    public function deleteInvite(int $userID, int $inviteID): bool;
}
