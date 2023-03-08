<?php

namespace App\Services\Agent;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agent\Followers\AllInviteAgentSearchDTO;
use App\DTO\User\DefaultAgentDTO;
use App\Enums\Socket\Agency\Subscription;
use App\Enums\Socket\Agent\Invite;
use App\Http\Requests\Agent\Subscription\AllAgentFollowerRequest;
use App\Http\Requests\Agent\Subscription\AllAgentInviteRequest;
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

    public function accept(DefaultAgentDTO $agentDTO, int $inviteID): bool
    {
        $subscription = $this->subscriptionRepo->createSubscriptionFromRequest($agentDTO, $inviteID);

        if (!empty($subscription)) {
            $this->socket->sendToUser(
                $subscription['user_subscriber_id'],
                Invite::ACCEPT,
                ['id' => $subscription['subscription_id']]
            );

            $this->socket->sendToUser(
                $subscription['user_subscriber_id'],
                Subscription::NEW_FOLLOW,
                $agentDTO
            );
        }

        return !empty($subscription);
    }

    public function decline(int $userID, int $inviteID): bool
    {
        $subscriptionRequest = $this->subscriptionRepo->setRejectStatusForInvite($userID, $inviteID);
        if ($subscriptionRequest['updated']) {
            $this->socket->sendToUser($subscriptionRequest['user_sender_id'], Invite::DECLINE, ['id' => $inviteID]);
        }

        return $subscriptionRequest['updated'];
    }

    public function totalFollowers(int $userID): int
    {
        return $this->subscriptionRepo->totalSubscriber($userID);
    }

    public function totalInvites(int $userID): int
    {
        return $this->subscriptionRepo->totalInvitesToSubscribe($userID);
    }

    public function allFollowers(AllFollowsSearchDTO $followerSearchDTO): array
    {
        return $this->subscriptionRepo->allSubscriber($followerSearchDTO);
    }

    public function allInvites(AllInviteAgentSearchDTO $inviteSearchDTO): array
    {
        return $this->subscriptionRepo->allRequests($inviteSearchDTO);
    }
}
