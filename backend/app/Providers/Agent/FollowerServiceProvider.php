<?php

namespace App\Providers\Agent;

use App\Repositories\PostgreSql\Agent\SubscriptionRepo;
use App\Services\Agent\Follower;
use App\Services\Contracts\Agent\Follower as FollowerContract;
use App\Services\Socket\Pusher;
use Illuminate\Support\ServiceProvider;

class FollowerServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(FollowerContract::class, function ($app){
            return new Follower($app->make(SubscriptionRepo::class), $app->make(Pusher::class));
        });
    }

    public function boot()
    {
    }
}
