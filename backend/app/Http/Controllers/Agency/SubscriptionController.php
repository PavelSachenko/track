<?php

namespace App\Http\Controllers\Agency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agency\Subscription\AllFollowsRequest;
use App\Http\Requests\Agency\Subscription\AllRequestsRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;
use App\Services\Contracts\Agency\IFollowerAgencyService;

class SubscriptionController extends Controller
{
    private IFollowerAgencyService $follower;

    public function __construct(IFollowerAgencyService $follower)
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
        return response()->json($this->follower->allFollows($request));
    }

    public function requests(AllRequestsRequest $request)
    {
        return response()->json($this->follower->allRequests($request));
    }

    public function unsubscribe(int $id)
    {
        return response()->json($this->follower->deleteFollow($id));
    }

    public function inviteDelete(int $id)
    {
        return response()->json($this->follower->deleteInvite($id));
    }
}
