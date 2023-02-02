<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiJsonResponseMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        response()->header('Content-Type', 'application/json');

        return $next($request);
    }
}
