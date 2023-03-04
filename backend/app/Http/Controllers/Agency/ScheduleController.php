<?php

namespace App\Http\Controllers\Agency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agency\Schedule\AllRequest;
use App\Models\WorkSchedule;
use App\Models\WorkTime;
use App\Services\Contracts\Agency\ISchedule;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    private ISchedule $schedule;

    public function __construct(ISchedule $schedule)
    {
        $this->schedule = $schedule;
    }

    public function index(AllRequest $request)
    {
        return $this->schedule->agentsSchedules($request);
    }
}
