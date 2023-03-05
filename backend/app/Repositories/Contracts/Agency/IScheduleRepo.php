<?php

namespace App\Repositories\Contracts\Agency;

interface IScheduleRepo
{
    public function all(int $userID, string $dateFrom, string $dateTo, string $search = null): array;
}
