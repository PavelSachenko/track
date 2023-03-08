<?php

namespace App\Http\Controllers\Agent\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Settings\UpdateWorkingScheduleRequest;
use App\Http\Requests\Agent\Settings\UpdateWorkStatusRequest;
use App\Services\Contracts\Agent\ISettingsAgentService;
use Illuminate\Http\JsonResponse;

class ScheduleController extends Controller
{
    private ISettingsAgentService $settings;

    public function __construct(ISettingsAgentService $settings)
    {
        $this->settings = $settings;
    }

    public function getWorkTime(): JsonResponse
    {
        return response()->json($this->settings->getWorkingSchedule(\Auth::user()->id));
    }

    public function setWorkStatus(UpdateWorkStatusRequest $request): JsonResponse
    {
        return response()->json($this->settings->setIsAvailableForToday(\Auth::user()->id, $request->is_available));
    }

    public function setWorkTime(UpdateWorkingScheduleRequest $request): JsonResponse
    {
        return response()->json($this->settings->setWorkingSchedule(\Auth::user()->id, $request->mode, $request->times));
    }
}
