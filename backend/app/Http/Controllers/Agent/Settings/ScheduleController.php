<?php

namespace App\Http\Controllers\Agent\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Settings\UpdateWorkingScheduleRequest;
use App\Http\Requests\Agent\Settings\UpdateWorkStatusRequest;
use App\Services\Contracts\Agent\ISettingsAgentService;

class ScheduleController extends Controller
{
    private ISettingsAgentService $settings;

    public function __construct(ISettingsAgentService $settings)
    {
        $this->settings = $settings;
    }

    public function getWorkTime()
    {
        return response()->json($this->settings->getWorkingSchedule());
    }

    public function setWorkStatus(UpdateWorkStatusRequest $request)
    {
        return response()->json($this->settings->setIsAvailableForToday($request->is_available));
    }

    public function setWorkTime(UpdateWorkingScheduleRequest $request)
    {
        return response()->json($this->settings->setWorkingSchedule($request));
    }
}
