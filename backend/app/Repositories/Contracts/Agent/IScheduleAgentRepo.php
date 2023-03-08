<?php

namespace App\Repositories\Contracts\Agent;

interface IScheduleAgentRepo
{
    public function scheduleForOneDay(int $agentID, string $dateFrom, string $dateTo): array;

    public function addWorkRecord(string $dateFrom, string $dateTo, int $type, ?string $description, ?int $agencyID);

    public function deleteWorkRecord(int $id): bool;

    public function updateWorkRecord(
        int $id,
        string $dateFrom,
        string $dateTo,
        int $type,
        ?string $description,
        ?int $agencyID
    ): array;
}
