<?php

namespace App\DTO\User\Agency\Follows;

readonly class AllInvitesSearchDTO
{
    public function __construct(
        public int     $userID,
        public int     $limit,
        public int     $offset,
        public ?string $search = null,
    )
    {
    }
}
