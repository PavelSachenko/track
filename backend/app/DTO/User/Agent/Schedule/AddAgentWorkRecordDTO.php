<?php

namespace App\DTO\User\Agent\Schedule;

readonly class AddAgentWorkRecordDTO
{
    public function __construct(
        public int     $userID,
        public int     $start,
        public int     $end,
        public int     $type,
        public ?int    $agencyID,
        public ?string $description
    )
    {
    }
}
