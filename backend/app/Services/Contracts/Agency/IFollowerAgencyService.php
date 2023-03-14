<?php

namespace App\Services\Contracts\Agency;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\Http\Requests\Agency\Subscription\AllAgencyFollowsRequest;

interface IFollowerAgencyService extends IInviteAgencyService
{
    public function totalFollows(int $userID): int;

    public function totalRequest(int $userID): int;

    public function allFollows(AllFollowsSearchDTO $allFollowsSearchDTO): array;

    public function deleteFollow(int $userID, int $followID): bool;
}
