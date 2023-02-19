<?php

namespace App\Providers\Agent;

use App\Repositories\PostgreSql\Agent\ScheduleRepo;
use App\Services\Agent\Schedule;
use App\Services\Contracts\Agent\Schedule as ScheduleContract;
use App\Services\Socket\Pusher;
use Illuminate\Support\ServiceProvider;

class ScheduleServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ScheduleContract::class, function ($app){
            return new Schedule($app->make(ScheduleRepo::class), $app->make(Pusher::class));
        });
    }

    public function boot()
    {
    }
}
