<?php

namespace App\DTO\User\Agent\Followers;

readonly class AllInviteAgentSearchDTO
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
