<?php

namespace App\Repositories\PostgreSql\Agent;

use App\Models\WorkSchedule;
use App\Models\WorkTime;

class ScheduleRepo implements \App\Repositories\Contracts\Agent\ScheduleRepo
{
    public function getScheduleForOneDay(string $dateFrom, string $dateTo): array
    {
        $workTime = WorkTime::where('user_id', \Auth::user()->id)->first();
        if ($workTime->current_mode == WorkTime::CUSTOM_MODE) {
            $workTime = $workTime->{$workTime->current_mode . '_times'}[(int)date('N', strtotime($dateFrom)) - 1];
        } else {
            $workTime = $workTime->{$workTime->current_mode . '_times'};
        }
        $workTimeFrom = strtotime(date('Y-m-d ', strtotime($dateFrom)) . $workTime['from']);
        $workTimeTo = strtotime(date('Y-m-d ' , strtotime($dateFrom)). $workTime['to']);

        $workSchedule = WorkSchedule::whereBetween('from', [$dateFrom, $dateTo])
            ->whereBetween('to', [$dateFrom, $dateTo])
            ->where('user_id', \Auth::user()->id)
            ->orderBy('from', 'asc')
            ->get()->toArray();

        $date = [
            'from' => $workTimeFrom * 1000,
            'to' => $workTimeTo * 1000
        ];

        if (!empty($workSchedule)) {
            $date = [
                'from' => $workTimeFrom < strtotime($workSchedule[0]['from'])
                    ? $workTimeFrom * 1000
                    : strtotime($workSchedule[0]['from']) * 1000,

                'to' => $workTimeTo > strtotime($workSchedule[array_key_last($workSchedule)]['to'])
                    ? $workTimeTo * 1000
                    : strtotime($workSchedule[array_key_last($workSchedule)]['to']) * 1000
            ];
        }

        // TODO schedule request
        return [
            'date' => $date,
            'schedule' => $workSchedule,
            'scheduleRequests' => [],
        ];
    }

    public function addWorkRecord(string $dateFrom, string $dateTo, int $type, ?string $description, ?int $agencyID): array
    {
        $workRecord = WorkSchedule::create([
            'user_id' => \Auth::user()->id,
            'from' => $dateFrom,
            'to' => $dateTo,
            'type' => $type,
            'description' => $description,
            'bound_user_id' => $agencyID,
        ]);

        return $workRecord->with('agency')->where('id', $workRecord->id)->first()->toArray();
    }

    public function deleteWorkRecord(int $id): bool
    {
        return WorkSchedule::where('id', $id)->where('user_id', \Auth::user()->id)->delete();
    }

    public function updateWorkRecord(
        int $id,
        string $dateFrom,
        string $dateTo,
        int $type,
        ?string $description,
        ?int $agencyID
    ): array {
        $workRecord = WorkSchedule::where('id', $id)
            ->where('user_id', \Auth::user()->id)
            ->first();
        if (empty($workRecord)) {
            return [];
        }

        $workRecord->update([
            'from' => $dateFrom,
            'to' => $dateTo,
            'type' => $type,
            'description' => $description,
            'bound_user_id' => $agencyID,
        ]);
        return $workRecord->with('agency')->where('id', $workRecord->id)->first()->toArray();
    }
}
