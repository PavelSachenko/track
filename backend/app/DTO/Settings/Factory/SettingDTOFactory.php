<?php

namespace App\DTO\Settings\Factory;

use App\DTO\Settings\UpdateGeneralSettingsDTO;
use App\Http\Requests\User\SettingsRequest;

class SettingDTOFactory implements ISettingsDTOFactory
{

    public function createUpdateGeneralSettingsDTO(SettingsRequest $request): UpdateGeneralSettingsDTO
    {
        return new UpdateGeneralSettingsDTO(
            userID: $request->user()->id,
            userType: $request->user()->type,
            name: $request?->name,
            description: $request?->description,
            phone: $request?->phone,
            url: $request?->url
        );
    }
}
