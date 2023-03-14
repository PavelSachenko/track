<?php

namespace App\DTO\User\Agent\Schedule;

readonly class UpdateAgentWorkRecordDTO
{
    public function __construct(
        public int     $ID,
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
