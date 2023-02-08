<?php

namespace App\Services\Agent;

use App\Http\Requests\Agent\Schedule\AddWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\DeleteWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\ScheduleRequest;
use App\Models\WorkSchedule;
use App\Repositories\Contracts\Agent\ScheduleRepo;

class Schedule implements \App\Services\Contracts\Agent\Schedule
{
    private ScheduleRepo $scheduleRepo;
    public function __construct(ScheduleRepo $repo)
    {
        $this->scheduleRepo = $repo;
    }

    public function getOneDay(ScheduleRequest $request):array
    {
        $date = date("Y-m-d", $request->date / 1000);
        $from = $date . ' 00:00:00';
        $to = date('Y-m-d', strtotime("+1 day", strtotime($date))) . ' 00:00:00';

        return $this->scheduleRepo->getScheduleForOneDay($from, $to);
    }

    public function addWorkRecord(AddWorkRecordRequest $request): array
    {
        return $this->scheduleRepo->addWorkRecord(
            date("Y-m-d H:i:s", $request->start / 1000),
            date("Y-m-d H:i:s", $request->end / 1000),
            WorkSchedule::TYPE[$request->type],
            $request?->description,
            $request?->agencyId,
        );
    }

    public function deleteWorkRecord(DeleteWorkRecordRequest $request): bool
    {
        return true;
    }
}
