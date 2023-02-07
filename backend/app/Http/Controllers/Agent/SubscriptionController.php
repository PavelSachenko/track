<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\Subscription\AllFollowersRequest;
use App\Http\Requests\Agent\Subscription\AllRequestsRequest;
use App\Http\Requests\Agent\Subscription\DecisionInviteRequest;
use App\Services\Contracts\Agent\Follower;

class SubscriptionController extends Controller
{
    private Follower $follower;

    public function __construct(Follower $follower)
    {
        $this->follower = $follower;
    }

    public function countFollowers()
    {
        return response()->json($this->follower->countFollowers());
    }

    public function followers(AllFollowersRequest $request)
    {
        return response()->json($this->follower->getAllFollowers($request));
    }

    public function countRequests()
    {
        return response()->json($this->follower->countRequests());
    }

    public function accept(DecisionInviteRequest $request)
    {
        return response()
            ->json($this->follower->accept($request));
    }

    public function decline(DecisionInviteRequest $request)
    {
        return response()
            ->json($this->follower->decline($request));
    }

    public function requests(AllRequestsRequest $request)
    {
        return response()
            ->json($this->follower->getAllRequests($request));
    }
}
