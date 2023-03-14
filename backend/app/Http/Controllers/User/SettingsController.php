<?php

namespace App\Http\Controllers\User;

use App\DTO\Settings\Factory\ISettingsDTOFactory;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\SettingsRequest;
use App\Http\Requests\User\UpdateAvatarRequest;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Services\Contracts\User\ISettings;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    public function __construct(
        readonly private ISettings  $settings,
        readonly private ISettingsDTOFactory $settingsDTOFactory
    )
    {
    }

    public function update(SettingsRequest $request): JsonResponse
    {
        return response()->json($this->settings->updateCommonSettings(
            $this->settingsDTOFactory->createUpdateGeneralSettingsDTO($request)
        ));
    }

    public function updateAvatar(UpdateAvatarRequest $request): JsonResponse
    {
        return response()->json($this->settings->updateAvatar(\Auth::user()->id, \Auth::user()->type, $request->file('img')));
    }

    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        return response()->json($this->settings->updatePassword(
            \Auth::user()->id,
            \Auth::user()->password,
            $request->old_password,
            $request->new_password
        ));
    }
}
