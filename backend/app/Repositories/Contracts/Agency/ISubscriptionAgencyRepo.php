<?php

namespace App\Repositories\Contracts\Agency;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;

interface ISubscriptionAgencyRepo extends IInviteAgencyRepo
{
    public function totalFollows(int $userID): int;

    public function totalRequest(int $userID): int;

    public function allFollows(AllFollowsSearchDTO $allFollowsSearchDTO): array;

    public function deleteFollow(int $userID, int $followID): bool;
}
