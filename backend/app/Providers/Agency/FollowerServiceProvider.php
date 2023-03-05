<?php

namespace App\Providers\Agency;

use App\Repositories\PostgreSql\Agency\FollowerRepo;
use App\Repositories\PostgreSql\User\AuthRepo;
use App\Services\Agency\Follower;
use App\Services\Contracts\Agency\Follower as FollowerContract;
use App\Services\Socket\Pusher;
use Illuminate\Support\ServiceProvider;

class FollowerServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(FollowerContract::class, function ($app) {
            return new Follower($app->make(FollowerRepo::class, ['auth' => new AuthRepo()]), $app->make(Pusher::class));
        });
    }

    public function boot()
    {
    }
}
