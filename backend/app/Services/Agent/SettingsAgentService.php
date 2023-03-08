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

    public function setIsAvailableForToday(bool $isAvailable): bool
    {
        return $this->workTimes->updateIsAvailable($isAvailable);
    }

    public function setWorkingSchedule(UpdateWorkingScheduleRequest $request): bool
    {
        //TODO validation json $request
        return $this->workTimes->updateWorkTime($request->mode, (array)json_decode($request->times));
    }

    public function getWorkingSchedule(): array
    {
        return $this->workTimes->agentWorkTimes();
    }
}
