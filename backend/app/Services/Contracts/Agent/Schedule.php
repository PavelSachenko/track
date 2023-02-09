<?php

namespace App\Services\Contracts\Agent;

use App\Http\Requests\Agent\Schedule\AddWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\DeleteWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\ScheduleRequest;

interface Schedule
{
    public function getOneDay(ScheduleRequest $request): array;
    public function addWorkRecord(AddWorkRecordRequest $request): array;
    public function deleteWorkRecord(DeleteWorkRecordRequest $request): bool;
}
