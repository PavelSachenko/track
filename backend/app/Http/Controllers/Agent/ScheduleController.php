<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Schedule\AddWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\ScheduleRequest;
use App\Models\WorkSchedule;
use App\Services\Contracts\Agent\Schedule;

class ScheduleController extends Controller
{
    private Schedule $schedule;
    public function __construct(Schedule $schedule)
    {
        $this->schedule = $schedule;
    }

    public function index(ScheduleRequest $request)
    {
        return response()->json($this->schedule->getOneDay($request));
    }

    public function add(AddWorkRecordRequest $request)
    {
        return response()->json($this->schedule->addWorkRecord($request));
    }
}
