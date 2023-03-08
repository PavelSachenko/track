<?php

namespace App\Http\Controllers\Agency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agency\Schedule\AllRequest;
use App\Models\WorkSchedule;
use App\Models\WorkTime;
use App\Services\Contracts\Agency\IScheduleAgencyService;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    private IScheduleAgencyService $schedule;

    public function __construct(IScheduleAgencyService $schedule)
    {
        $this->schedule = $schedule;
    }

    public function index(AllRequest $request)
    {
        return $this->schedule->agentsSchedules($request);
    }
}
