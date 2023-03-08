<?php

namespace App\DTO\User\Agency\Follows\Factory;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agency\Follows\AllInvitesSearchDTO;
use App\Http\Requests\Agency\Subscription\AllAgencyFollowsRequest;
use App\Http\Requests\Agency\Subscription\AllAgencyInvitesRequest;

class FollowAgencyFactory implements IFollowAgencyDTOFactory
{
    /**
     * @param AllAgencyFollowsRequest $request
     * @return AllFollowsSearchDTO
     */
    public function createAllFollowSearchDTO(AllAgencyFollowsRequest $request): AllFollowsSearchDTO
    {
        return new AllFollowsSearchDTO(
            userID: $request->user()->id,
            limit: $request?->limit ?? 20,
            offset: $request?->offset ?? 0,
            search: $request->search,
        );
    }

    public function createAllInviteFollowSearchDTO(AllAgencyInvitesRequest $request): AllInvitesSearchDTO
    {
        return new AllInvitesSearchDTO(
            userID: $request->user()->id,
            limit: $request?->limit ?? 20,
            offset: $request?->offset ?? 0,
            search: $request?->search,
        );
    }
}
