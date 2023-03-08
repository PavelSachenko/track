<?php

namespace App\Repositories\Contracts\Agency;

interface IScheduleAgencyRepo
{
    public function all(int $userID, string $dateFrom, string $dateTo, string $search = null): array;
}
