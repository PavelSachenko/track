<?php

namespace App\Services\Contracts\Agent;

use App\Http\Requests\Agent\Settings\UpdateWorkingScheduleRequest;

interface ISettingsAgentService
{
    public function setIsAvailableForToday(int $userID, bool $isAvailable): bool;

    public function setWorkingSchedule(int $userID, string $mode, string $jsonTimes): bool;

    public function getWorkingSchedule(int $userID,): array;
}
