<?php

namespace App\DTO\User\Agent\Followers\Factory;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agent\Followers\AllInviteAgentSearchDTO;
use App\Http\Requests\Agent\Subscription\AllAgentFollowerRequest;
use App\Http\Requests\Agent\Subscription\AllAgentInviteRequest;

interface IFollowerAgentDTOFactory
{
    public function createAllAgentFollowersSearchDTO(AllAgentFollowerRequest $request): AllFollowsSearchDTO;

    public function createAllAgentInvitesSearchDTO(AllAgentInviteRequest $request): AllInviteAgentSearchDTO;
}
