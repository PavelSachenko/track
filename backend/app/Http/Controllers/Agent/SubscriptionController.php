<?php

namespace App\Http\Controllers\Agent;

use App\DTO\User\Agent\Followers\Factory\IFollowerAgentDTOFactory;
use App\DTO\User\Factory\IUserDTOFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Subscription\AllAgentFollowerRequest;
use App\Http\Requests\Agent\Subscription\AllAgentInviteRequest;
use App\Http\Requests\Agent\Subscription\DecisionInviteRequest;
use App\Services\Contracts\Agent\IFollowerAgentService;
use Illuminate\Http\JsonResponse;

class SubscriptionController extends Controller
{
    public function __construct(
        private readonly IFollowerAgentService    $follower,
        private readonly IFollowerAgentDTOFactory $followerDTOFactory,
        private readonly IUserDTOFactory          $userDTOFactory
    )
    {
    }

    /**
     * @return JsonResponse
     */
    public function totalFollowers(): JsonResponse
    {
        return response()->json($this->follower->totalFollowers(\Auth::user()->id));
    }

    /**
     * @param AllAgentFollowerRequest $request
     * @return JsonResponse
     */
    public function followers(AllAgentFollowerRequest $request): JsonResponse
    {
        return response()->json(
            $this->follower->allFollowers($this->followerDTOFactory->createAllAgentFollowersSearchDTO($request))
        );
    }

    /**
     * @return JsonResponse
     */
    public function totalInvites(): JsonResponse
    {
        return response()->json($this->follower->totalInvites(\Auth::user()->id));
    }

    /**
     * @param DecisionInviteRequest $request
     * @return JsonResponse
     */
    public function accept($id): JsonResponse
    {
        return response()
            ->json($this->follower->accept($this->userDTOFactory->createAgentUserDTO(\Auth::user()->toArray()), $id));
    }

    /**
     * @param DecisionInviteRequest $request
     * @return JsonResponse
     */
    public function decline($id): JsonResponse
    {
        return response()
            ->json($this->follower->decline(\Auth::user()->id, $id));
    }

    /**
     * @param AllAgentInviteRequest $request
     * @return JsonResponse
     */
    public function invites(AllAgentInviteRequest $request): JsonResponse
    {
        return response()
            ->json($this->follower->allInvites($this->followerDTOFactory->createAllAgentInvitesSearchDTO($request)));
    }
}
