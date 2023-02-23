<?php

namespace App\Services\Agent;

use App\Enums\Socket\Agency\Subscription;
use App\Enums\Socket\Agent\Invite;
use App\Http\Requests\Agent\Subscription\AllFollowersRequest;
use App\Http\Requests\Agent\Subscription\AllRequestsRequest;
use App\Http\Requests\Agent\Subscription\DecisionInviteRequest;
use App\Repositories\Contracts\Agent\SubscriptionRepo;
use App\Services\Contracts\Socket\Socket;

class Follower implements \App\Services\Contracts\Agent\Follower
{
    private SubscriptionRepo $subscriptionRepo;
    private Socket $socket;

    public function __construct(SubscriptionRepo $subscriptionRepo, Socket $socket)
    {
        $this->subscriptionRepo = $subscriptionRepo;
        $this->socket = $socket;
    }

    public function accept(DecisionInviteRequest $request): bool
    {
        $subscription = $this->subscriptionRepo->createSubscriptionFromRequest($request->id);
        if (!empty($subscription)){
            $this->socket->sendToUser($subscription['user_subscriber_id'], Invite::ACCEPT, ['id' => $subscription['subscription_id']]);
            $this->socket->sendToUser($subscription['user_subscriber_id'], Subscription::NEW_FOLLOW, \Auth::user()->toArray());
        }

        return !empty($subscription);
    }

    public function decline(DecisionInviteRequest $request): bool
    {
        $subscriptionRequest = $this->subscriptionRepo->setRejectStatusForRequest($request->id);
        if ($subscriptionRequest['updated']){
            $this->socket->sendToUser($subscriptionRequest['user_sender_id'], Invite::DECLINE, ['id' => $request->id]);
        }

        return $subscriptionRequest['updated'];
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

    public function getAllRequests(AllRequestsRequest $request): array
    {
        return $this->subscriptionRepo->getAllRequests($request->limit, $request->offset, $request->search? : '');
    }
}
