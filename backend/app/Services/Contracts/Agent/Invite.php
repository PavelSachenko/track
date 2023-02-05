<?php

namespace App\Services\Contracts\Agent;

use App\Http\Requests\Agent\Subscription\DecisionInviteRequest;

interface Invite
{
    public function accept(DecisionInviteRequest $request): bool;
    public function decline(DecisionInviteRequest $request): bool;
}
