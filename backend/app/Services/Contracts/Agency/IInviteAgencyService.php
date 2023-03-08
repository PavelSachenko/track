<?php

namespace App\Services\Contracts\Agency;

use App\Http\Requests\Agency\Subscription\AllRequestsRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;

interface IInviteAgencyService
{
    public function sendInvite(SendInviteRequest $request): bool;

    public function allRequests(AllRequestsRequest $request): array;

    public function deleteInvite(int $inviteID): bool;
}
