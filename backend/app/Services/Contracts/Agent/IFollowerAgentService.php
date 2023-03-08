<?php

namespace App\Services\Contracts\Agent;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\Http\Requests\Agent\Subscription\AllAgentFollowerRequest;

interface IFollowerAgentService extends IInviteAgentService
{
    public function totalFollowers(int $userID): int;

    public function allFollowers(AllFollowsSearchDTO $followerSearchDTO): array;
}
