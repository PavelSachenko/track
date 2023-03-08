<?php

namespace App\Providers\Agency;

use App\DTO\User\Agency\Follows\Factory\IFollowAgencyDTOFactory;
use App\Repositories\PostgreSql\Agency\FollowerAgencyRepo;
use App\Repositories\PostgreSql\User\AuthRepo;
use App\Services\Agency\FollowerAgencyService;
use App\Services\Contracts\Agency\IFollowerAgencyService as FollowerContract;
use App\Services\Socket\Pusher;
use Illuminate\Support\ServiceProvider;

class FollowerServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(FollowerContract::class, function ($app) {
            return new FollowerAgencyService($app->make(FollowerAgencyRepo::class, ['auth' => new AuthRepo()]), $app->make(Pusher::class));
        });
    }

    public function boot()
    {
    }
}
