<?php

namespace App\Services\Contracts\Agent;

use App\Http\Requests\Agent\Subscription\AllFollowersRequest;

interface Follower extends Invite
{
    public function countFollowers(): int;

    public function getAllFollowers(AllFollowersRequest $request): array;
}
