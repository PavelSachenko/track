<?php

namespace App\Services\Agency;

use App\Http\Requests\Agency\Subscription\AllFollowsRequest;
use App\Http\Requests\Agency\Subscription\AllRequestsRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;
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
        //TODO why we need token?
        return $this->followerRepo->createInviteRequest($request->email, $request->message? : "hello", "token");
    }

    public function totalFollows(): int
    {
        return $this->followerRepo->countFollows();
    }

    public function totalRequest(): int
    {
        return $this->followerRepo->countRequest();
    }

    public function getAllFollows(AllFollowsRequest $request): array
    {
        return $this->followerRepo->getAllFollows($request->limit, $request->offset, $request->search? : '');
    }

    public function getAllRequests(AllRequestsRequest $request): array
    {
        return $this->followerRepo->getAllRequests($request->limit, $request->offset, $request->search? : '');
    }

}
