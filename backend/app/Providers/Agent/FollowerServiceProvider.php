<?php

namespace App\Providers\Agent;

use App\Repositories\PostgreSql\Agent\SubscriptionAgentRepo;
use App\Services\Agent\FollowerAgentService;
use App\Services\Contracts\Agent\IFollowerAgentService as FollowerContract;
use App\Services\Socket\Pusher;
use Illuminate\Support\ServiceProvider;

class FollowerServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(FollowerContract::class, function ($app) {
            return new FollowerAgentService($app->make(SubscriptionAgentRepo::class), $app->make(Pusher::class));
        });
    }

    public function boot()
    {
    }
}
