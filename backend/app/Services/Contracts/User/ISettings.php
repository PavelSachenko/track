<?php

namespace App\Services\Contracts\User;

use App\DTO\Settings\UpdateGeneralSettingsDTO;
use Illuminate\Http\UploadedFile;

interface ISettings
{
    public function updateCommonSettings(UpdateGeneralSettingsDTO $updateGeneralSettingsDTO): bool;

    public function updateAvatar(int $userID, int $userType, UploadedFile $photo): bool;

    public function updatePassword(int $userID, string $currentPassword, string $oldInputPassword, string $newInputPassword): bool;
}
