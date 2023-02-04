<?php

namespace App\Providers\Agency;

use App\Repositories\PostgreSql\Agency\FollowerRepo;
use App\Repositories\PostgreSql\User\AuthRepo;
use App\Services\Agency\Follower;
use Illuminate\Support\ServiceProvider;

class FollowerServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->instance(Follower::class, new Follower(new FollowerRepo(new AuthRepo())));
    }

    public function boot()
    {
    }
}
