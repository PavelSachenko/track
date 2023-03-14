<?php

namespace App\Repositories\PostgreSql\Agent;

use App\DTO\User\Agent\Schedule\AddAgentWorkRecordDTO;
use App\DTO\User\Agent\Schedule\UpdateAgentWorkRecordDTO;
use App\Models\WorkSchedule;
use App\Models\WorkTime;

class ScheduleAgentRepo implements \App\Repositories\Contracts\Agent\IScheduleAgentRepo
{
    public function scheduleForOneDay(int $agentID, string $dateFrom, string $dateTo): array
    {
        $workTime = WorkTime::where('user_id', $agentID)->first();
        if ($workTime->current_mode == WorkTime::CUSTOM_MODE) {
            $workTime = $workTime->{$workTime->current_mode . '_times'}[(int)date('N', strtotime($dateFrom)) - 1];
        } else {
            $workTime = $workTime->{$workTime->current_mode . '_times'};
        }
        $workTimeFrom = strtotime(date('Y-m-d ', strtotime($dateFrom)) . $workTime['from']);
        $workTimeTo = strtotime(date('Y-m-d ', strtotime($dateFrom)) . $workTime['to']);

        $workSchedule = WorkSchedule::whereBetween('from', [$dateFrom, $dateTo])
            ->whereBetween('to', [$dateFrom, $dateTo])
            ->where('user_id', $agentID)
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

    public function addWorkRecord(AddAgentWorkRecordDTO $addAgentWorkRecordDTO, string $dateFrom, string $dateTo): array
    {
        $workRecord = WorkSchedule::create([
            'user_id' => $addAgentWorkRecordDTO->userID,
            'from' => $dateFrom,
            'to' => $dateTo,
            'type' => $addAgentWorkRecordDTO->type,
            'description' => $addAgentWorkRecordDTO->description,
            'bound_user_id' => $addAgentWorkRecordDTO->agencyID,
        ]);

        return $workRecord->with('agency')->where('id', $workRecord->id)->first()->toArray();
    }

    public function deleteWorkRecord(int $userID, int $id): bool
    {
        return WorkSchedule::where('id', $id)->where('user_id', $userID)->delete();
    }

    public function updateWorkRecord(UpdateAgentWorkRecordDTO $updateAgentWorkRecordDTO, string $dateFrom, string $dateTo): array
    {
        $workRecord = WorkSchedule::where('id', $updateAgentWorkRecordDTO->ID)
            ->where('user_id', $updateAgentWorkRecordDTO->userID)
            ->first();
        if (empty($workRecord)) {
            return [];
        }

        $workRecord->update([
            'from' => $dateFrom,
            'to' => $dateTo,
            'type' => $updateAgentWorkRecordDTO->type,
            'description' => $updateAgentWorkRecordDTO->description,
            'bound_user_id' => $updateAgentWorkRecordDTO->agencyID,
        ]);
        return $workRecord->with('agency')->where('id', $workRecord->id)->first()->toArray();
    }
}
