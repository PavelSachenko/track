<?php

namespace App\Http\Controllers\Agency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agency\Followers\SendInviteRequest;
use App\Services\Agency\Follower;

class SubscriptionController extends Controller
{
    public function sendRequest(SendInviteRequest $request, Follower $follower)
    {
        return response()->json($follower->sendInvite($request));
    }
}
