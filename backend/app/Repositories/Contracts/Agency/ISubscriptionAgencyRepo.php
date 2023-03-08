<?php

namespace App\Repositories\Contracts\Agency;

interface ISubscriptionAgencyRepo extends IInviteAgencyRepo
{
    public function totalFollows(): int;

    public function totalRequest(): int;

    public function allFollows(int $limit, int $offset, string $search): array;

    public function deleteFollow(int $followID): bool;
}
