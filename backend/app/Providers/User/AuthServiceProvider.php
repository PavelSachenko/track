<?php

namespace App\Providers\User;

use App\Facade\Img;
use App\Repositories\PostgreSql\User\AuthRepo;
use App\Services\Contracts\User\Auth as ContractAuth;
use App\Services\User\Auth;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->instance(ContractAuth::class, new Auth(new AuthRepo()));
    }

    public function boot()
    {
    }
}
