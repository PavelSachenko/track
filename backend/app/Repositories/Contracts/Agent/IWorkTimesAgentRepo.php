<?php

namespace App\Repositories\Contracts\Agent;

interface IWorkTimesAgentRepo
{
    public function updateWorkTime(string $mode, array|object $times): bool;

    public function updateIsAvailable(bool $isAvailable): bool;

    public function agentWorkTimes(): array;
}
