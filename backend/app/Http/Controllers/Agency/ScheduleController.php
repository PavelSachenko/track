<?php

namespace App\Http\Controllers\Agency;

use App\Http\Controllers\Controller;

class ScheduleController extends Controller
{
    public function index()
    {
        return response()->json(['test' => 'huest']);
    }
}
