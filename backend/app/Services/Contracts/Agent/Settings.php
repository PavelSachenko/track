<?php

namespace App\Services\Contracts\Agent;

use App\Http\Requests\Agent\Settings\UpdateWorkingScheduleRequest;

interface Settings
{
    public function setIsAvailableForToday(bool $isAvailable): bool;
    public function setWorkingSchedule(UpdateWorkingScheduleRequest $request): bool;
    public function getWorkingSchedule(): array;
}
