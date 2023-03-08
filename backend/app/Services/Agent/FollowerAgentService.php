<?php

namespace App\Services\Agent;

use App\Enums\Socket\Agency\Subscription;
use App\Enums\Socket\Agent\Invite;
use App\Http\Requests\Agent\Subscription\AllFollowersRequest;
use App\Http\Requests\Agent\Subscription\AllRequestsRequest;
use App\Http\Requests\Agent\Subscription\DecisionInviteRequest;
use App\Repositories\Contracts\Agent\ISubscriptionAgentRepo;
use App\Services\Contracts\Socket\ISocket;

class FollowerAgentService implements \App\Services\Contracts\Agent\IFollowerAgentService
{
    private ISubscriptionAgentRepo $subscriptionRepo;
    private ISocket $socket;

    public function __construct(ISubscriptionAgentRepo $subscriptionRepo, ISocket $socket)
    {
        $this->subscriptionRepo = $subscriptionRepo;
        $this->socket = $socket;
    }

    public function accept(DecisionInviteRequest $request): bool
    {
        $subscription = $this->subscriptionRepo->createSubscriptionFromRequest($request->id);

        if (!empty($subscription)) {
            $this->socket->sendToUser(
                $subscription['user_subscriber_id'],
                Invite::ACCEPT,
                ['id' => $subscription['subscription_id']]
            );

            $this->socket->sendToUser(
                $subscription['user_subscriber_id'],
                Subscription::NEW_FOLLOW,
                \Auth::user()->toArray()
            );
        }

        return !empty($subscription);
    }

    public function decline(DecisionInviteRequest $request): bool
    {
        $subscriptionRequest = $this->subscriptionRepo->setRejectStatusForRequest($request->id);
        if ($subscriptionRequest['updated']) {
            $this->socket->sendToUser($subscriptionRequest['user_sender_id'], Invite::DECLINE, ['id' => $request->id]);
        }

        return $subscriptionRequest['updated'];
    }

    public function totalFollowers(): int
    {
        return $this->subscriptionRepo->totalSubscriber();
    }

    public function totalRequests(): int
    {
        return $this->subscriptionRepo->totalRequestToSubscribe();
    }

    public function allFollowers(AllFollowersRequest $request): array
    {
        return $this->subscriptionRepo->allSubscriber($request->limit, $request->offset, $request->search ?: '');
    }

    public function allRequests(AllRequestsRequest $request): array
    {
        return $this->subscriptionRepo->allRequests($request->limit, $request->offset, $request->search ?: '');
    }
}
