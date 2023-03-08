<?php

namespace App\Providers;

use App\DTO\Settings\Factory\ISettingsDTOFactory;
use App\DTO\Settings\Factory\SettingDTOFactory;
use App\DTO\User\Agency\Follows\Factory\FollowAgencyDTOFactory;
use App\DTO\User\Agency\Follows\Factory\IFollowAgencyDTOFactory;
use App\DTO\User\Agent\Followers\Factory\FollowerAgentDTOFactory;
use App\DTO\User\Agent\Followers\Factory\IFollowerAgentDTOFactory;
use App\DTO\User\Agent\Schedule\Factory\IScheduleAgentDTOFactory;
use App\DTO\User\Agent\Schedule\Factory\ScheduleAgentDTOFactory;
use App\DTO\User\Factory\IUserDTOFactory;
use App\DTO\User\Factory\UserDTOFactory;
use Illuminate\Support\ServiceProvider;

class DTOServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(IFollowAgencyDTOFactory::class, FollowAgencyDTOFactory::class);
        $this->app->singleton(IFollowerAgentDTOFactory::class, FollowerAgentDTOFactory::class);
        $this->app->singleton(IUserDTOFactory::class, UserDTOFactory::class);
        $this->app->singleton(IScheduleAgentDTOFactory::class, ScheduleAgentDTOFactory::class);
        $this->app->singleton(ISettingsDTOFactory::class, SettingDTOFactory::class);
    }

    public function boot(): void
    {

    }
}
