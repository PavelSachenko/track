<?php

namespace App\Services\Agent;

use App\Http\Requests\Agent\Schedule\SetWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\UpdateWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\DeleteWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\ScheduleRequest;
use App\Models\WorkSchedule;
use App\Repositories\Contracts\Agent\IScheduleAgentRepo;
use App\Services\Contracts\Socket\ISocket;
use App\Enums\Socket\Agent\Schedule as EnumSchedule;

class ScheduleAgentService implements \App\Services\Contracts\Agent\IScheduleAgentService
{
    private IScheduleAgentRepo $scheduleRepo;
    private ISocket $socket;

    public function __construct(IScheduleAgentRepo $repo, ISocket $socket)
    {
        $this->scheduleRepo = $repo;
        $this->socket = $socket;
    }

    public function oneDay(ScheduleRequest $request): array
    {
        $date = date("Y-m-d", $request->date / 1000);
        $from = $date . ' 00:00:00';
        $to = date('Y-m-d', strtotime("+1 day", strtotime($date))) . ' 00:00:00';

        return $this->scheduleRepo->scheduleForOneDay(\Auth::user()->id, $from, $to);
    }

    public function addWorkRecord(SetWorkRecordRequest $request): array
    {
        $workRecord = $this->scheduleRepo->addWorkRecord(
            date("Y-m-d H:i:s", $request->start / 1000),
            date("Y-m-d H:i:s", $request->end / 1000),
            WorkSchedule::TYPE[$request->type],
            $request?->description,
            $request?->agencyId,
        );

        $this->socket->sendToUser(\Auth::user()->id, EnumSchedule::ADD_EVENT, $workRecord);

        return $workRecord;
    }

    public function updateWorkRecord(int $id, SetWorkRecordRequest $request): array
    {

        return $this->scheduleRepo->updateWorkRecord(
            $id,
            date("Y-m-d H:i:s", $request->start / 1000),
            date("Y-m-d H:i:s", $request->end / 1000),
            WorkSchedule::TYPE[$request->type],
            $request?->description,
            $request?->agencyId,
        );
    }

    public function deleteWorkRecord(int $id): bool
    {
        return $this->scheduleRepo->deleteWorkRecord($id);
    }
}
