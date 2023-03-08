<?php

namespace App\Repositories\Contracts\Agent;

interface IWorkTimesAgentRepo
{
    public function updateWorkTime(int $userID, string $mode, array $times): bool;

    public function updateIsAvailable(int $userID, bool $isAvailable): bool;

    public function agentWorkTimes(int $userID): array;
}
