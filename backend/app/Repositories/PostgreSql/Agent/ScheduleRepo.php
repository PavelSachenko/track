<?php

namespace App\Repositories\PostgreSql\Agent;

use App\Models\WorkSchedule;
use App\Models\WorkTime;

class ScheduleRepo implements \App\Repositories\Contracts\Agent\ScheduleRepo
{
    public function getScheduleForOneDay(string $dateFrom, string $dateTo): array
    {
        $workTime = WorkTime::where('user_id', \Auth::user()->id)->first();
        $workTime = ($workTime->{$workTime->current_mode . '_times'}[(int)date('N', strtotime(date('l')))-1]);
        $workTimeFrom = strtotime(date('Y-m-d ' . $workTime['from']));
        $workTimeTo = strtotime(date('Y-m-d ' . $workTime['to']));

        $workSchedule = WorkSchedule::whereBetween('from', [$dateFrom, $dateTo])
            ->whereBetween('to', [$dateFrom, $dateTo])
            ->where('user_id', \Auth::user()->id)
            ->orderBy('from', 'asc')
            ->get()->toArray();

        $date = [
          'from' => $workTimeFrom < strtotime($workSchedule[0]['from']) ? $workTimeFrom * 1000 : strtotime($workSchedule[0]['from']) * 1000,
          'to' => $workTimeTo > strtotime($workSchedule[0]['to']) ? $workTimeFrom * 1000 : strtotime($workSchedule[0]['to']) * 1000
        ];

        // TODO schedule request
        return [
            'date' => $date,
            'schedule' => $workSchedule,
            'scheduleRequests' => [],
        ];
    }

    public function addWorkRecord(string $dateFrom, string $dateTo, int $type, ?string $description, ?int $agencyID): array
    {
        $test =  WorkSchedule::create([
           'user_id' => \Auth::user()->id,
            'from' => $dateFrom,
            'to' => $dateTo,
            'type' => $type,
            'description' => $description,
            'bound_user_id' => $agencyID,
        ]);

        return $test->with('agency')->where('id', $test->id)->first()->toArray();
    }

    public function deleteWorkRecord(int $id)
    {
        // TODO: Implement deleteWorkRecord() method.
    }
}
