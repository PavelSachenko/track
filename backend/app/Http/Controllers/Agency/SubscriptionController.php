<?php

namespace App\Http\Controllers\Agency;

use App\DTO\User\Agency\Follows\Factory\IFollowAgencyDTOFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agency\Subscription\AllAgencyFollowsRequest;
use App\Http\Requests\Agency\Subscription\AllAgencyInvitesRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;
use App\Services\Contracts\Agency\IFollowerAgencyService;
use App\Services\User\Auth;
use Illuminate\Http\JsonResponse;

class SubscriptionController extends Controller
{
    private IFollowerAgencyService $follower;
    private IFollowAgencyDTOFactory $DTOFactory;

    public function __construct(IFollowerAgencyService $follower, IFollowAgencyDTOFactory $DTOFactory)
    {
        $this->follower = $follower;
        $this->DTOFactory = $DTOFactory;
    }

    public function sendRequest(SendInviteRequest $request): JsonResponse
    {
        return response()->json($this->follower->sendInvite(\Auth::user()->id, $request->email, $request->message));
    }

    public function totalFollows(): JsonResponse
    {
        return response()->json($this->follower->totalFollows(\Auth::user()->id));
    }

    public function totalRequests(): JsonResponse
    {
        return response()->json($this->follower->totalRequest(\Auth::user()->id));
    }

    public function follows(AllAgencyFollowsRequest $request): JsonResponse
    {
        return response()->json(
            $this->follower->allFollows($this->DTOFactory->createAllFollowSearchDTO($request))
        );
    }

    public function requests(AllAgencyInvitesRequest $request): JsonResponse
    {
        return response()->json(
            $this->follower->allInvites($this->DTOFactory->createAllInviteFollowSearchDTO($request))
        );
    }

    public function unsubscribe(int $id): JsonResponse
    {
        return response()->json($this->follower->deleteFollow(\Auth::user()->id, $id));
    }

    public function inviteDelete(int $id): JsonResponse
    {
        return response()->json($this->follower->deleteInvite(\Auth::user()->id, $id));
    }
}
