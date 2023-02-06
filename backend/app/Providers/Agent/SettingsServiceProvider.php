<?php

namespace App\Providers\Agent;

use App\Repositories\PostgreSql\Agent\WorkTimes;
use App\Services\Agent\Settings;
use App\Services\Contracts\Agent\Settings as SettingsContract;
use Illuminate\Support\ServiceProvider;

class SettingsServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(SettingsContract::class, function ($app){
            return new Settings($app->make(WorkTimes::class));
        });
    }

    public function boot()
    {
    }
}
