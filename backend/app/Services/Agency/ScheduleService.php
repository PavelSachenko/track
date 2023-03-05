<?php

namespace App\Services\Agency;

use App\Http\Requests\Agency\Schedule\AllRequest;
use App\Repositories\Contracts\Agency\IScheduleRepo;
use App\Services\Contracts\Agency\ISchedule;

class ScheduleService implements ISchedule
{
    private IScheduleRepo $repo;

    public function __construct(IScheduleRepo $repo)
    {
        $this->repo = $repo;
    }

    public function agentsSchedules(AllRequest $request): array
    {
        $date = date("Y-m-d", $request->date / 1000);
        $from = $date . ' 00:00:00';
        $to = date('Y-m-d', strtotime("+1 day", strtotime($date))) . ' 00:00:00';

        return $this->repo->all(\Auth::user()->id, $from, $to, $request->search);
    }
}