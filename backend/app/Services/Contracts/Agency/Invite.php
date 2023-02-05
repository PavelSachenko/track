<?php

namespace App\Services\Contracts\Agency;

use App\Http\Requests\Agency\Subscription\SendInviteRequest;

interface Invite
{
    public function sendInvite(SendInviteRequest $request): bool;
}
