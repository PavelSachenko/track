<?php

namespace Database\Seeders;

use App\Enums\AgencyEnum;
use App\Enums\AgentEnum;
use App\Models\Subscription;
use App\Models\WorkSchedule;
use App\Models\WorkTime;
use Illuminate\Database\Seeder;

class WorkScheduleSeeder extends Seeder
{
    private const MAX_WORK_TIME_HOUR = 3;

    public function run()
    {
        $createdAt = date('Y-m-d H:i:s');
        $hours = $this->getHours();
        $minutesWithSeconds = ["00:00", "15:00", "30:00", "45:00"];

        $agencyID = AgencyEnum::localMainAgencyID();
        $agentIds = Subscription::select(['user_id'])->where(['user_subscriber_id' => $agencyID])->pluck('user_id');

        foreach ($agentIds as $agentID) {
            $workTime = WorkTime::where('user_id', $agentID)->first();

            foreach (['yesterday', 'today', 'tomorrow'] as $day) {
                $startDateRange = $this->dateRange($workTime, $day);

                $startIndexFrom = array_search($startDateRange['from'], $hours);
                $endIndexTo = array_search($startDateRange['to'], $hours);
                $randEnd = $startIndexFrom;

                $addRecord = true;
                while ($addRecord) {
                    $randStart = rand($randEnd, $randEnd + self::MAX_WORK_TIME_HOUR);
                    $randEnd = rand($randStart + 1, $randStart + self::MAX_WORK_TIME_HOUR);

                    $randStartMinute = rand(0, self::MAX_WORK_TIME_HOUR);
                    $randEndMinute = rand(0, self::MAX_WORK_TIME_HOUR);
                    if (intval((count($hours) - $startIndexFrom) / self::MAX_WORK_TIME_HOUR) >= 20 || $randEnd >= $endIndexTo) {
                        $addRecord = false;
                    }

                    $from = $startDateRange['date'] . ' ' . $hours[$randStart] . $minutesWithSeconds[$randStartMinute];
                    $to = $startDateRange['date'] . ' ' . $hours[$randEnd] . $minutesWithSeconds[$randEndMinute];

                    if (WorkSchedule::where('user_id', $agentID)
                        ->whereRaw('("from", "to") OVERLAPS (?, ?)', [$from, $to])
                        ->exists()) {
                        continue;
                    }

                    WorkSchedule::insert([
                        'user_id' => $agentID,
                        'type' => 1,
                        'from' => $from,
                        'to' => $to,
                        'description' => 'mock data',
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt
                    ]);
                }
            }
        }
    }

    private function getHours(): array
    {
        return [
            "00:", "01:", "02:", "03:", "04:", "05:", "06:", "07:", "08:",
            "09:", "10:", "11:", "12:", "13:", "14:", "15:", "16:",
            "17:", "18:", "19:", "20:", "21:", "22:", "23:",
        ];
    }

    private function dateRange(WorkTime $workTime, string $day = 'today'): array
    {
        $todayOfWeekNumber = (int)date('N');

        $dayOfWeekNumber = match ($day) {
            'yesterday' => $todayOfWeekNumber == 1 ? 7 : $todayOfWeekNumber - 1,
            'tomorrow' => $todayOfWeekNumber == 7 ? 1 : $todayOfWeekNumber + 1,
            default => $todayOfWeekNumber
        };

        if (gettype($workTime->{$workTime->current_mode . "_times"}) == 'array') {
            $from = substr($workTime->{$workTime->current_mode . "_times"}[$dayOfWeekNumber - 1]['from'], 0, -2);
            $to = substr($workTime->{$workTime->current_mode . "_times"}[$dayOfWeekNumber - 1]['to'], 0, -2);
        } else {
            $from = substr($workTime->{$workTime->current_mode . "_times"}->from, 0, -2);
            $to = substr($workTime->{$workTime->current_mode . "_times"}->to, 0, -2);
        }

        return [
            'from' => $from,
            'to' => $to,
            'date' => match ($day) {
                'yesterday' => date('Y-m-d', strtotime('-1 day')),
                'tomorrow' => date('Y-m-d', strtotime('+1 day')),
                default => date('Y-m-d')
            }
        ];
    }
}
