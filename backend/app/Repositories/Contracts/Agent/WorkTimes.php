<?php

namespace App\Repositories\Contracts\Agent;

interface WorkTimes
{
    public function updateWorkTime(string $mode, array $times): bool;
    public function updateIsAvailable(bool $isAvailable): bool;
    public function getWorkTimes(): array;
}
