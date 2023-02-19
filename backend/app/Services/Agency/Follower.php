<?php

namespace App\Services\Agency;

use App\Enums\Socket\Agent\Invite;
use App\Http\Requests\Agency\Subscription\AllFollowsRequest;
use App\Http\Requests\Agency\Subscription\AllRequestsRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;
use App\Repositories\PostgreSql\Agency\FollowerRepo;
use App\Services\Contracts\Socket\Socket;

class Follower implements \App\Services\Contracts\Agency\Follower
{
    private FollowerRepo $followerRepo;
    private Socket $socket;

    public function __construct(FollowerRepo $repo, Socket $socket)
    {
        $this->followerRepo = $repo;
        $this->socket = $socket;
    }

    /**
     * @throws \Throwable
     */
    public function sendInvite(SendInviteRequest $request): bool
    {
        //TODO why we need token?
        $inviteId = $this->followerRepo->createInviteRequest($request->email, $request->message? : "hello", "token");
        $invite = $this->followerRepo->getOneRequest($inviteId);
        $this->socket->sendToUser($invite['user_receiver_id'],  Invite::NEW, $invite);

        return $inviteId;
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

    public function deleteFollow(int $followID): bool
    {
        return $this->followerRepo->deleteFollow($followID);
    }

    public function deleteInvite(int $inviteID): bool
    {
        return $this->followerRepo->deleteInviteFollow($inviteID);
    }
}
