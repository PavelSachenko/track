<?php

namespace App\Http\Controllers\Agent;

use App\DTO\User\Agent\Schedule\Factory\IScheduleAgentDTOFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Schedule\AddWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\ScheduleRequest;
use App\Http\Requests\Agent\Schedule\UpdateWorkRecordRequest;
use App\Services\Contracts\Agent\IScheduleAgentService;
use Illuminate\Http\JsonResponse;

class ScheduleController extends Controller
{
    public function __construct(
        private readonly IScheduleAgentService    $schedule,
        private readonly IScheduleAgentDTOFactory $scheduleAgentDTOFactory,
    )
    {
    }

    public function oneDay(ScheduleRequest $request): JsonResponse
    {
        return response()->json(
            $this->schedule->oneDay(\Auth::user()->id, $request->date)
        );
    }

    public function add(AddWorkRecordRequest $request): JsonResponse
    {
        return response()
            ->json($this->schedule->addWorkRecord($this->scheduleAgentDTOFactory->createAddWorkRecordDTO($request)));
    }

    public function drop(int $id): JsonResponse
    {
        return response()->json($this->schedule->deleteWorkRecord(\Auth::user()->id, $id));
    }

    public function update(int $id, UpdateWorkRecordRequest $request): JsonResponse
    {
        return response()->json($this->schedule->updateWorkRecord($this->scheduleAgentDTOFactory->createUpdateWorkRecordDTO($request)));
    }
}
