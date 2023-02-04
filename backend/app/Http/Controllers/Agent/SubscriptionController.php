<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;

class SubscriptionController extends Controller
{
    public function countFollowers()
    {
        return response()->json(0);
    }

    public function followers()
    {
        return response()->json([]);
    }

    public function countRequests()
    {
        return response()->json([]);
    }

    public function accept()
    {
        return response()->json([]);
    }

    public function decline()
    {
        return response()->json([]);
    }
}
