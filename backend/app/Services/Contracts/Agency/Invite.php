<?php

namespace App\Services\Contracts\Agency;

use App\Http\Requests\Agency\Subscription\AllRequestsRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;

interface Invite
{
    public function sendInvite(SendInviteRequest $request): bool;

    public function getAllRequests(AllRequestsRequest $request): array;

    public function deleteInvite(int $inviteID): bool;
}
