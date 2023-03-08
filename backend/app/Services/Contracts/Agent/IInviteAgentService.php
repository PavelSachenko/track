<?php

namespace App\Services\Contracts\Agent;

use App\Http\Requests\Agent\Subscription\AllRequestsRequest;
use App\Http\Requests\Agent\Subscription\DecisionInviteRequest;

interface IInviteAgentService
{
    public function accept(DecisionInviteRequest $request): bool;

    public function decline(DecisionInviteRequest $request): bool;

    public function totalRequests(): int;

    public function allRequests(AllRequestsRequest $request): array;
}
