<?php

namespace App\Services\User;

use App\DTO\Settings\UpdateGeneralSettingsDTO;
use App\Enums\UserEnum;
use App\Exceptions\ForbiddenException;
use App\Http\Requests\User\SettingsRequest;
use App\Http\Requests\User\UpdateAvatarRequest;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Models\User;
use App\Repositories\Contracts\User\IAuthRepo;
use App\Repositories\Contracts\User\ISettingsRepo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;

class Settings implements \App\Services\Contracts\User\ISettings
{
    private ISettingsRepo $settingsRepo;
    private IAuthRepo $authRepo;

    public function __construct(ISettingsRepo $repo, IAuthRepo $authRepo)
    {
        $this->settingsRepo = $repo;
        $this->authRepo = $authRepo;
    }

    public function updateCommonSettings(UpdateGeneralSettingsDTO $updateGeneralSettingsDTO): bool
    {
        $defaultGeneralSettings = [
            'name' => $updateGeneralSettingsDTO->name,
            'description' => $updateGeneralSettingsDTO->description,
            'phone' => $updateGeneralSettingsDTO->phone,
        ];

        if ($updateGeneralSettingsDTO->userType == UserEnum::AGENCY){
            $defaultGeneralSettings['url'] = $updateGeneralSettingsDTO->url;
        }

        return $this->settingsRepo->update($updateGeneralSettingsDTO->userID, $updateGeneralSettingsDTO->userType, $defaultGeneralSettings);
    }

    public function updateAvatar(int $userID, int $userType, UploadedFile $photo): bool
    {
        return $this->settingsRepo->update($userID, $userType, [
            'img' => \Img::uploadToS3($photo)
        ]);
    }

    /**
     * @param UpdatePasswordRequest $request
     * @return bool
     */
    public function updatePassword(int $userID, string $currentPassword, string $oldInputPassword, string $newInputPassword): bool
    {
        if (!\Hash::check($oldInputPassword, $currentPassword)) {
            throw new ForbiddenException("Wrong old password");
        }

        return $this->authRepo->createNewPassword($userID, Hash::make($newInputPassword));
    }
}
