<?php

namespace App\Services\Contracts\Agent;

use App\DTO\User\Agent\Followers\AllInviteAgentSearchDTO;
use App\DTO\User\DefaultAgentDTO;

interface IInviteAgentService
{
    public function accept(DefaultAgentDTO $agentDTO, int $inviteID): bool;

    public function decline(int $userID, int $inviteID): bool;

    public function totalInvites(int $userID): int;

    public function allInvites(AllInviteAgentSearchDTO $inviteSearchDTO): array;
}
