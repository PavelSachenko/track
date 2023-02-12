<?php

namespace App\Repositories\Contracts\Agent;

use App\Http\Requests\Agent\Schedule\ScheduleRequest;

interface ScheduleRepo
{
    public function getScheduleForOneDay(string $dateFrom, string $dateTo): array;
    public function addWorkRecord(string $dateFrom, string $dateTo, int $type, ?string $description, ?int $agencyID);
    public function deleteWorkRecord(int $id): bool;
    public function updateWorkRecord(int $id, string $dateFrom, string $dateTo, int $type, ?string $description, ?int $agencyID): array;
}
