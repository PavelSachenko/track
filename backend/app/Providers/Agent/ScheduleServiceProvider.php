<?php

namespace App\Providers\Agent;

use App\Repositories\PostgreSql\Agent\ScheduleAgentRepo;
use App\Services\Agent\ScheduleAgentService;
use App\Services\Contracts\Agent\IScheduleAgentService as ScheduleContract;
use App\Services\Socket\Pusher;
use Illuminate\Support\ServiceProvider;

class ScheduleServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ScheduleContract::class, function ($app) {
            return new ScheduleAgentService($app->make(ScheduleAgentRepo::class), $app->make(Pusher::class));
        });
    }

    public function boot()
    {
    }
}
