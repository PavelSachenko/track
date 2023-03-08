<?php

namespace App\DTO\User\Agency\Follows\Factory;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agency\Follows\AllInvitesSearchDTO;
use App\Http\Requests\Agency\Subscription\AllAgencyFollowsRequest;
use App\Http\Requests\Agency\Subscription\AllAgencyInvitesRequest;

interface IFollowAgencyDTOFactory
{
    public function createAllFollowSearchDTO(AllAgencyFollowsRequest $request): AllFollowsSearchDTO;

    public function createAllInviteFollowSearchDTO(AllAgencyInvitesRequest $request): AllInvitesSearchDTO;
}
