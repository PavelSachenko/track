<?php

namespace App\Providers;

use App\DTO\User\Agency\Follows\Factory\FollowAgencyFactory;
use App\DTO\User\Agency\Follows\Factory\IFollowAgencyDTOFactory;
use App\Http\Requests\Agency\Subscription\AllAgencyFollowsRequest;
use Illuminate\Support\ServiceProvider;

class DTOServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        $this->app->bind(IFollowAgencyDTOFactory::class, FollowAgencyFactory::class);
    }
}
