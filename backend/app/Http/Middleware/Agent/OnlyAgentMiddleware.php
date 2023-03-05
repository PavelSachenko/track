<?php

namespace App\Http\Middleware\Agent;

use App\Exceptions\ForbiddenException;
use App\Models\Agent;
use Closure;
use Illuminate\Http\Request;

class OnlyAgentMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (\Auth::user()::class != Agent::class) {
            throw new ForbiddenException("Access is denied: only agent has access");
        }
        return $next($request);
    }
}
