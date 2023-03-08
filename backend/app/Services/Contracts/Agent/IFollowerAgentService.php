<?php

namespace App\Services\Contracts\Agent;

use App\Http\Requests\Agent\Subscription\AllFollowersRequest;

interface IFollowerAgentService extends IInviteAgentService
{
    public function totalFollowers(): int;

    public function allFollowers(AllFollowersRequest $request): array;
}
