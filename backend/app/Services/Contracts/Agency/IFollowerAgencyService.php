<?php

namespace App\Services\Contracts\Agency;

use App\Http\Requests\Agency\Subscription\AllFollowsRequest;

interface IFollowerAgencyService extends IInviteAgencyService
{
    public function totalFollows(): int;

    public function totalRequest(): int;

    public function allFollows(AllFollowsRequest $request): array;

    public function deleteFollow(int $followID): bool;
}
