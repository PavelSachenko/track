<?php

namespace App\Providers\User;

use App\Repositories\PostgreSql\User\SettingsRepo;
use App\Services\Contracts\User\Settings as SettingsContract;
use App\Services\User\Settings;
use Illuminate\Support\ServiceProvider;

class SettingsServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(SettingsContract::class, function ($app){
            return new Settings($app->make(SettingsRepo::class));
        });
    }

    public function boot()
    {
    }
}
