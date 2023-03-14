<?php

namespace App\Repositories\Contracts\Agent;

use App\DTO\User\Agent\Schedule\AddAgentWorkRecordDTO;
use App\DTO\User\Agent\Schedule\UpdateAgentWorkRecordDTO;

interface IScheduleAgentRepo
{
    public function scheduleForOneDay(int $agentID, string $dateFrom, string $dateTo): array;

    public function addWorkRecord(AddAgentWorkRecordDTO $addAgentWorkRecordDTO, string $dateFrom, string $dateTo);

    public function deleteWorkRecord(int $userID, int $id): bool;

    public function updateWorkRecord(UpdateAgentWorkRecordDTO $updateAgentWorkRecordDTO, string $dateFrom, string $dateTo): array;
}
