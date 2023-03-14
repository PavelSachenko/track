<?php

namespace App\DTO\Settings\Factory;

use App\DTO\Settings\UpdateGeneralSettingsDTO;
use App\Http\Requests\User\SettingsRequest;

interface ISettingsDTOFactory
{
    public function createUpdateGeneralSettingsDTO(SettingsRequest $request): UpdateGeneralSettingsDTO;
}
