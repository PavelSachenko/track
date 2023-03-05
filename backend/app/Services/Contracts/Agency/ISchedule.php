<?php

namespace App\Services\Contracts\Agency;

use App\Http\Requests\Agency\Schedule\AllRequest;

interface ISchedule
{
    public function agentsSchedules(AllRequest $request): array;
}
