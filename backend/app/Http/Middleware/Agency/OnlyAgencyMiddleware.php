<?php

namespace App\Http\Middleware\Agency;

use App\Exceptions\ForbiddenException;
use App\Models\Agency;
use Closure;
use Illuminate\Http\Request;

class OnlyAgencyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (\Auth::user()::class != Agency::class) {
            throw new ForbiddenException("Access is denied: only agency has access");
        }
        return $next($request);
    }
}
