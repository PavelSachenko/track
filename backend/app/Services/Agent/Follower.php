<?php

namespace App\Services\Agent;

use App\Http\Requests\Agent\Subscription\AllFollowersRequest;
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

    public function countFollowers(): int
    {
        return $this->subscriptionRepo->countSubscriber();
    }

    public function countRequests(): int
    {
        return $this->subscriptionRepo->countRequestToSubscribe();
    }

    public function getAllFollowers(AllFollowersRequest $request): array
    {
        return $this->subscriptionRepo->getAllSubscriber($request->limit, $request->offset, $request->search? : '');
    }
}
