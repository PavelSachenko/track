<?php

namespace App\Providers;

use App\DTO\User\Agency\Follows\Factory\FollowAgencyDTOFactory;
use App\DTO\User\Agency\Follows\Factory\IFollowAgencyDTOFactory;
use App\DTO\User\Agent\Followers\Factory\FollowerAgentDTOFactory;
use App\DTO\User\Agent\Followers\Factory\IFollowerAgentDTOFactory;
use App\DTO\User\Agent\Schedule\Factory\IScheduleAgentDTOFactory;
use App\DTO\User\Agent\Schedule\Factory\ScheduleAgentDTOFactory;
use App\DTO\User\DefaultAgentDTO;
use App\DTO\User\Factory\IUserDTOFactory;
use App\DTO\User\Factory\UserDTOFactory;
use Illuminate\Support\ServiceProvider;

class DTOServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        $this->app->bind(IFollowAgencyDTOFactory::class, FollowAgencyDTOFactory::class);
        $this->app->bind(IFollowerAgentDTOFactory::class, FollowerAgentDTOFactory::class);
        $this->app->bind(IUserDTOFactory::class, UserDTOFactory::class);
        $this->app->bind(IScheduleAgentDTOFactory::class, ScheduleAgentDTOFactory::class);
    }
}
