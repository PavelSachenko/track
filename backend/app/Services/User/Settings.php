<?php

namespace App\Services\User;

use App\Http\Requests\User\SettingsRequest;
use App\Http\Requests\User\UpdateAvatarRequest;
use App\Models\User;
use App\Repositories\Contracts\User\SettingsRepo;

class Settings implements \App\Services\Contracts\User\Settings
{

    private SettingsRepo $repo;

    public function __construct(SettingsRepo $repo)
    {
        $this->repo = $repo;
    }
    public function updateCommonSettings(SettingsRequest $request): bool
    {
        $params = $request->validated();
        if (\Auth::user()->type == User::TYPE_AGENT){
            unset($params['url']);
        }

        return $this->repo->update(\Auth::user()->id, \Auth::user()->type, $params);
    }

    public function updateAvatar(UpdateAvatarRequest $request): bool
    {
        return $this->repo->update(\Auth::user()->id, \Auth::user()->type, [
            'img' => \Img::uploadToS3($request->file('img'))
        ]);
    }
}
