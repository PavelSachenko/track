<?php

namespace App\Repositories\PostgreSql\Agent;

use App\Models\WorkTime;

class WorkTimes implements \App\Repositories\Contracts\Agent\WorkTimes
{

    public function updateWorkTime(string $mode, array $times): bool
    {
        return (bool)\DB::table('work_times')
            ->where('user_id', \Auth::user()->id)
            ->update(['current_mode' => $mode, $mode .'_times' => $times]);
    }

    public function updateIsAvailable(bool $isAvailable): bool
    {
        return (bool)\DB::table('agents')
            ->where('user_id', \Auth::user()->id)
            ->update(['is_available' => $isAvailable]);
    }

    public function getWorkTimes(): array
    {
        return WorkTime::where('user_id',\Auth::user()->id)->first()->toArray();
    }
}
