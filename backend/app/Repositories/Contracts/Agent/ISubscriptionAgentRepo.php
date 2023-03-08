<?php

namespace App\Repositories\Contracts\Agent;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agent\Followers\AllInviteAgentSearchDTO;
use App\DTO\User\DefaultAgentDTO;

interface ISubscriptionAgentRepo
{
    public function createSubscriptionFromRequest(DefaultAgentDTO $agentDTO, int $subscriptionInviteID): array;

    public function setRejectStatusForInvite(int $userID, int $subscriptionInviteID): array;

    public function totalSubscriber(int $userID): int;

    public function totalInvitesToSubscribe(int $userID): int;

    public function allSubscriber(AllFollowsSearchDTO $followerSearchDTO): array;

    public function allRequests(AllInviteAgentSearchDTO $inviteSearchDTO): array;
}
