<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Subscription\AllFollowersRequest;
use App\Http\Requests\Agent\Subscription\AllRequestsRequest;
use App\Http\Requests\Agent\Subscription\DecisionInviteRequest;
use App\Services\Contracts\Agent\IFollowerAgentService;
use Illuminate\Http\JsonResponse;

class SubscriptionController extends Controller
{
    private IFollowerAgentService $follower;

    /**
     * @param IFollowerAgentService $follower
     */
    public function __construct(IFollowerAgentService $follower)
    {
        $this->follower = $follower;
    }

    /**
     * @return JsonResponse
     */
    public function countFollowers(): JsonResponse
    {
        return response()->json($this->follower->totalFollowers());
    }

    /**
     * @param AllFollowersRequest $request
     * @return JsonResponse
     */
    public function followers(AllFollowersRequest $request): JsonResponse
    {
        return response()->json($this->follower->allFollowers($request));
    }

    /**
     * @return JsonResponse
     */
    public function countRequests(): JsonResponse
    {
        return response()->json($this->follower->totalRequests());
    }

    /**
     * @param DecisionInviteRequest $request
     * @return JsonResponse
     */
    public function accept(DecisionInviteRequest $request): JsonResponse
    {
        return response()
            ->json($this->follower->accept($request));
    }

    /**
     * @param DecisionInviteRequest $request
     * @return JsonResponse
     */
    public function decline(DecisionInviteRequest $request): JsonResponse
    {
        return response()
            ->json($this->follower->decline($request));
    }

    /**
     * @param AllRequestsRequest $request
     * @return JsonResponse
     */
    public function requests(AllRequestsRequest $request): JsonResponse
    {
        return response()
            ->json($this->follower->allRequests($request));
    }
}
