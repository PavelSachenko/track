<?php

namespace App\Services\Agency;

use App\Http\Requests\Agency\Schedule\AllRequest;
use App\Repositories\Contracts\Agency\IScheduleAgencyRepo;
use App\Services\Contracts\Agency\IScheduleAgencyService;

class ScheduleServiceAgencyService implements IScheduleAgencyService
{
    private IScheduleAgencyRepo $repo;

    public function __construct(IScheduleAgencyRepo $repo)
    {
        $this->repo = $repo;
    }

    public function agentsSchedules(int $userID, int $date, string $search = null): array
    {
        $date = date("Y-m-d", $date / 1000);
        $from = $date . ' 00:00:00';
        $to = date('Y-m-d', strtotime("+1 day", strtotime($date))) . ' 00:00:00';

        return [
            'work_times' => [
                'from' => strtotime(date('Y-m-d 03:00:00', strtotime($date))) * 1000,
                'to' => strtotime(date('Y-m-d 22:00:00', strtotime($date))) * 1000,
            ],
            'agents' => $this->repo->all($userID, $from, $to, $search)
        ];
    }
}
