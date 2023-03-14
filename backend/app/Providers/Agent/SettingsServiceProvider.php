<?php

namespace App\Providers\Agent;

use App\Repositories\PostgreSql\Agent\WorkTimesAgentRepo;
use App\Services\Agent\SettingsAgentService;
use App\Services\Contracts\Agent\ISettingsAgentService as SettingsContract;
use Illuminate\Support\ServiceProvider;

class SettingsServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(SettingsContract::class, function ($app) {
            return new SettingsAgentService($app->make(WorkTimesAgentRepo::class));
        });
    }

    public function boot()
    {
    }
}
