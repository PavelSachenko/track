<?php

namespace App\Services\Contracts\Agent;

use App\DTO\User\Agent\Schedule\AddAgentWorkRecordDTO;
use App\DTO\User\Agent\Schedule\UpdateAgentWorkRecordDTO;

interface IScheduleAgentService
{
    public function oneDay(int $userID, int $date): array;

    public function addWorkRecord(AddAgentWorkRecordDTO $addAgentWorkRecordDTO): array;

    public function deleteWorkRecord(int $userID, int $id): bool;

    public function updateWorkRecord(UpdateAgentWorkRecordDTO $updateAgentWorkRecordDTO): array;
}
