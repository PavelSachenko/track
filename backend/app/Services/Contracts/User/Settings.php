<?php

namespace App\Services\Contracts\User;

use App\Http\Requests\User\SettingsRequest;
use App\Http\Requests\User\UpdateAvatarRequest;

interface Settings
{
    public function updateCommonSettings(SettingsRequest $request): bool;
    public function updateAvatar(UpdateAvatarRequest $request): bool;
}
