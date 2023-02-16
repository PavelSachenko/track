<?php

namespace App\Services\User;

use App\Exceptions\ForbiddenException;
use App\Http\Requests\User\SettingsRequest;
use App\Http\Requests\User\UpdateAvatarRequest;
use App\Http\Requests\User\UpdatePasswordRequest;
use App\Models\User;
use App\Repositories\Contracts\User\AuthRepo;
use App\Repositories\Contracts\User\SettingsRepo;

class Settings implements \App\Services\Contracts\User\Settings
{
    private SettingsRepo $settingsRepo;
    private AuthRepo $authRepo;
    public function __construct(SettingsRepo $repo, AuthRepo $authRepo)
    {
        $this->settingsRepo = $repo;
        $this->authRepo = $authRepo;
    }

    public function updateCommonSettings(SettingsRequest $request): bool
    {
        $params = $request->validated();
        if (\Auth::user()->type == User::TYPE_AGENT){
            unset($params['url']);
        }

        return $this->settingsRepo->update(\Auth::user()->id, \Auth::user()->type, $params);
    }

    public function updateAvatar(UpdateAvatarRequest $request): bool
    {
        return $this->settingsRepo->update(\Auth::user()->id, \Auth::user()->type, [
            'img' => \Img::uploadToS3($request->file('img'))
        ]);
    }

    /**
     * @param UpdatePasswordRequest $request
     * @return bool
     */
    public function updatePassword(UpdatePasswordRequest $request): bool
    {
        if(!\Hash::check($request->old_password, \Auth::user()->user->password)){
            throw new ForbiddenException("Wrong old password");
        }

        return $this->authRepo->createNewPassword(\Auth::user()->id, $request->new_password);
    }
}
