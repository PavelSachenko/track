<?php

namespace App\Providers\Agency;

use App\Repositories\Contracts\Agency\IScheduleAgencyRepo;
use App\Repositories\PostgreSql\Agency\ScheduleAgencyRepo;
use App\Services\Agency\ScheduleServiceAgencyService;
use App\Services\Contracts\Agency\IScheduleAgencyService;
use Illuminate\Support\ServiceProvider;

class ScheduleServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(IScheduleAgencyService::class, function ($app) {
            return new ScheduleServiceAgencyService($app->make(ScheduleAgencyRepo::class));
        });
    }

    public function boot()
    {
    }
}
