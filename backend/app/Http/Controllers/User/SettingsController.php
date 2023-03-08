<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\SettingsRequest;
use App\Http\Requests\User\UpdateAvatarRequest;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Services\Contracts\User\ISettings;

class SettingsController extends Controller
{
    private ISettings $settings;

    public function __construct(ISettings $settings)
    {
        $this->settings = $settings;
    }

    public function update(SettingsRequest $request)
    {
        return response()->json($this->settings->updateCommonSettings($request));
    }

    public function updateAvatar(UpdateAvatarRequest $request)
    {
        return response()->json($this->settings->updateAvatar($request));
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        return response()->json($this->settings->updatePassword($request));
    }
}
