<?php

namespace App\DTO\User\Agent\Followers\Factory;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agent\Followers\AllInviteAgentSearchDTO;
use App\Http\Requests\Agent\Subscription\AllAgentFollowerRequest;
use App\Http\Requests\Agent\Subscription\AllAgentInviteRequest;

class FollowerAgentDTOFactory implements IFollowerAgentDTOFactory
{
    public function createAllAgentFollowersSearchDTO(AllAgentFollowerRequest $request): AllFollowsSearchDTO
    {
        return new AllFollowsSearchDTO(
            userID: $request->user()->id,
            limit: $request?->limit ?? 20,
            offset: $request?->offset ?? 0,
            search: $request->search,
        );
    }

    public function createAllAgentInvitesSearchDTO(AllAgentInviteRequest $request): AllInviteAgentSearchDTO
    {
        return new AllInviteAgentSearchDTO(
            userID: $request->user()->id,
            limit: $request?->limit ?? 20,
            offset: $request?->offset ?? 0,
            search: $request->search,
        );
    }
}
