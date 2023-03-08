<?php

namespace App\Services\Contracts\Agency;

use App\Http\Requests\Agency\Schedule\AllRequest;

interface IScheduleAgencyService
{
    public function agentsSchedules(int $userID, int $date, string $search = null): array;
}
