<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Schedule\SetWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\DeleteWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\UpdateWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\ScheduleRequest;
use App\Models\WorkSchedule;
use App\Rules\DateInWorkScheduleRule;
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

    public function add(SetWorkRecordRequest $request)
    {
        return response()->json($this->schedule->addWorkRecord($request));
    }

    public function drop(int $id)
    {
        return response()->json($this->schedule->deleteWorkRecord($id));
    }

    public function update(int $id, SetWorkRecordRequest $request)
    {
        return response()->json($this->schedule->updateWorkRecord($id,$request));
    }
}
