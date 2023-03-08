<?php

namespace App\Repositories\PostgreSql\Agent;

use App\Models\WorkTime;

class WorkTimesAgentRepo implements \App\Repositories\Contracts\Agent\IWorkTimesAgentRepo
{

    public function updateWorkTime(int $userID, string $mode, array $times): bool
    {
        return (bool)\DB::table('work_times')
            ->where('user_id', $userID)
            ->update(['current_mode' => $mode, $mode . '_times' => $times]);
    }

    public function updateIsAvailable(int $userID, bool $isAvailable): bool
    {
        return (bool)\DB::table('agents')
            ->where('user_id', $userID)
            ->update(['is_available' => $isAvailable]);
    }

    public function agentWorkTimes(int $userID): array
    {
        return WorkTime::where('user_id', $userID)->first()->toArray();
    }
}
