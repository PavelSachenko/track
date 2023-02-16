<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\SettingsRequest;
use App\Http\Requests\User\UpdateAvatarRequest;
use App\Services\Contracts\User\Settings;

class SettingsController extends Controller
{
    private Settings $settings;

    public function __construct(Settings $settings)
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
}
