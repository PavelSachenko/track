<?php

namespace App\Services\Agency;

use App\Http\Requests\Agency\Followers\SendInviteRequest;
use App\Repositories\Contracts\User\AuthRepo;
use App\Repositories\PostgreSql\Agency\FollowerRepo;

class Follower implements \App\Services\Contracts\Agency\Follower
{
    private FollowerRepo $followerRepo;

    public function __construct(FollowerRepo $repo)
    {
        $this->followerRepo = $repo;
    }

    /**
     * @throws \Throwable
     */
    public function sendInvite(SendInviteRequest $request): bool
    {
        return $this->followerRepo->createInviteRequest($request->email, $request->message? : "hello", "token");
    }
}
