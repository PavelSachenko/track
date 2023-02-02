<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiJsonResponseMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        //TODO here need json header
        return $next($request);
    }
}
