<?php

namespace App\Services\Agent;

use App\Http\Requests\Agent\Settings\UpdateWorkingScheduleRequest;
use App\Repositories\Contracts\Agent\IWorkTimesAgentRepo;

class SettingsAgentService implements \App\Services\Contracts\Agent\ISettingsAgentService
{
    private $workTimes;

    public function __construct(IWorkTimesAgentRepo $workTimes)
    {
        $this->workTimes = $workTimes;
    }

    public function setIsAvailableForToday(int $userID, bool $isAvailable): bool
    {
        return $this->workTimes->updateIsAvailable($userID, $isAvailable);
    }

    public function setWorkingSchedule(int $userID, string $mode, string $jsonTimes): bool
    {
        $decodedTimes = json_decode($jsonTimes, true, 512, JSON_OBJECT_AS_ARRAY);
        //TODO validation json $request
        return $this->workTimes->updateWorkTime($userID, $mode, $decodedTimes);
    }

    public function getWorkingSchedule(int $userID): array
    {
        return $this->workTimes->agentWorkTimes($userID);
    }
}
