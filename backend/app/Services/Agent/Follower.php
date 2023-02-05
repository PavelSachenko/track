<?php

namespace App\Services\Agent;

use App\Http\Requests\Agent\Subscription\DecisionInviteRequest;
use App\Repositories\Contracts\Agent\SubscriptionRepo;

class Follower implements \App\Services\Contracts\Agent\Follower
{
    private SubscriptionRepo $subscriptionRepo;

    public function __construct(SubscriptionRepo $subscriptionRepo)
    {
        $this->subscriptionRepo = $subscriptionRepo;
    }

    public function accept(DecisionInviteRequest $request): bool
    {
        return $this->subscriptionRepo->createSubscriptionFromRequest($request->id);
    }

    public function decline(DecisionInviteRequest $request): bool
    {
        return $this->subscriptionRepo->changeStatusSubscriptionFromRequest($request->id);
    }

}
