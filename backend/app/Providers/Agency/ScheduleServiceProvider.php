<?php

namespace App\Providers\Agency;

use App\Repositories\Contracts\Agency\IScheduleRepo;
use App\Repositories\PostgreSql\Agency\ScheduleRepo;
use App\Services\Agency\ScheduleService;
use App\Services\Contracts\Agency\ISchedule;
use Illuminate\Support\ServiceProvider;

class ScheduleServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ISchedule::class, function ($app) {
            return new ScheduleService($app->make(ScheduleRepo::class));
        });
    }

    public function boot()
    {
    }
}
