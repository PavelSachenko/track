<?php

namespace App\Http\Controllers\Agency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agency\Followers\SendInviteRequest;
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
}
