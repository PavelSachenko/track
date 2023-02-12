<?php

namespace App\Services\Contracts\Agent;

use App\Http\Requests\Agent\Schedule\SetWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\UpdateWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\DeleteWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\ScheduleRequest;

interface Schedule
{
    public function getOneDay(ScheduleRequest $request): array;
    public function addWorkRecord(SetWorkRecordRequest $request): array;
    public function deleteWorkRecord(int $id): bool;
    public function updateWorkRecord(int $id, SetWorkRecordRequest $request): array;
}
