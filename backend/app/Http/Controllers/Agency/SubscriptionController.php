<?php

namespace App\Http\Controllers\Agency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agency\Subscription\AllFollowsRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;
use App\Services\Contracts\Agency\Follower;

class SubscriptionController extends Controller
{
    private Follower $follower;

    public function __construct(Follower $follower)
    {
        $this->follower = $follower;
    }
    public function sendRequest(SendInviteRequest $request)
    {
        return response()->json($this->follower->sendInvite($request));
    }

    public function countFollows()
    {
        return response()->json($this->follower->totalFollows());

    }

    public function countRequests()
    {
        return response()->json($this->follower->totalRequest());
    }

    public function follows(AllFollowsRequest $request)
    {
        return response()->json($this->follower->getAllFollows($request));
    }
}
