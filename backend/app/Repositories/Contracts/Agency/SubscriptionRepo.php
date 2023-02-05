<?php

namespace App\Repositories\Contracts\Agency;

interface SubscriptionRepo extends InviteRepo
{
    public function countFollows(): int;
    public function countRequest(): int;
    public function getAllFollows(int $limit, int $offset, string $search): array;
}
