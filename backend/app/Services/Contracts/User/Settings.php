<?php

namespace App\Services\Contracts\User;

use App\Http\Requests\User\SettingsRequest;
use App\Http\Requests\User\UpdateAvatarRequest;
use App\Http\Requests\User\UpdatePasswordRequest;

interface Settings
{
    public function updateCommonSettings(SettingsRequest $request): bool;
    public function updateAvatar(UpdateAvatarRequest $request): bool;
    public function updatePassword(UpdatePasswordRequest $request): bool;
}
