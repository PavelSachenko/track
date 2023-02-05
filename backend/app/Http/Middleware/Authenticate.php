<?php

namespace App\Http\Middleware;

use App\Exceptions\AuthException;
use App\Exceptions\ForbiddenException;
use App\Models\User;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            throw new AuthException("not authorized user");
        }
    }

    public function handle($request, Closure $next, ...$guards)
    {
        $this->authenticate($request, $guards);

        $user = null;
        switch (\Auth::user()->type) {
            case User::TYPE_AGENT:
                $user = \Auth::user()->agent;
                break;
            case User::TYPE_AGENCY:
                $user = \Auth::user()->agency;
                break;
        }
        if (is_null($user)){
            throw new ForbiddenException("Registration for user not completed");
        }

        \Auth::setUser($user);

        return $next($request);
    }




}
