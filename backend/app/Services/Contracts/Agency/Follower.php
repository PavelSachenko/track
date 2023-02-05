<?php

namespace App\Services\Contracts\Agency;

use App\Http\Requests\Agency\Subscription\AllFollowsRequest;

interface Follower extends Invite
{
    public function totalFollows(): int;
    public function totalRequest(): int;
    public function getAllFollows(AllFollowsRequest $request): array;

}
