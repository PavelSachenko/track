<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Schedule\SetWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\DeleteWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\UpdateWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\ScheduleRequest;
use App\Models\WorkSchedule;
use App\Rules\DateInWorkScheduleRule;
use App\Services\Contracts\Agent\IScheduleAgentService;
use App\Services\Contracts\Socket\ISocket;
use Illuminate\Http\JsonResponse;

class ScheduleController extends Controller
{
    private IScheduleAgentService $schedule;

    public function __construct(IScheduleAgentService $schedule)
    {
        $this->schedule = $schedule;
    }

    public function index(ScheduleRequest $request): JsonResponse
    {
        return response()->json($this->schedule->oneDay($request));
    }

    public function add(SetWorkRecordRequest $request): JsonResponse
    {
        return response()->json($this->schedule->addWorkRecord($request));
    }

    public function drop(int $id): JsonResponse
    {
        return response()->json($this->schedule->deleteWorkRecord($id));
    }

    public function update(int $id, SetWorkRecordRequest $request): JsonResponse
    {
        return response()->json($this->schedule->updateWorkRecord($id, $request));
    }
}
