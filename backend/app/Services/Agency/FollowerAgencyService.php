<?php

namespace App\Services\Agency;

use App\Enums\Socket\Agent\Invite;
use App\Http\Requests\Agency\Subscription\AllFollowsRequest;
use App\Http\Requests\Agency\Subscription\AllRequestsRequest;
use App\Http\Requests\Agency\Subscription\SendInviteRequest;
use App\Repositories\PostgreSql\Agency\FollowerAgencyRepo;
use App\Services\Contracts\Socket\ISocket;

class FollowerAgencyService implements \App\Services\Contracts\Agency\IFollowerAgencyService
{
    private FollowerAgencyRepo $followerRepo;
    private ISocket $socket;

    public function __construct(FollowerAgencyRepo $repo, ISocket $socket)
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
        $inviteId = $this->followerRepo->createInviteRequest($request->email, $request->message ?: "hello", "token");
        $invite = $this->followerRepo->oneRequest($inviteId);
        $this->socket->sendToUser($invite['user_receiver_id'], Invite::NEW, $invite);

        return $inviteId;
    }

    public function totalFollows(): int
    {
        return $this->followerRepo->totalFollows();
    }

    public function totalRequest(): int
    {
        return $this->followerRepo->totalRequest();
    }

    public function allFollows(AllFollowsRequest $request): array
    {
        return $this->followerRepo->allFollows($request->limit, $request->offset, $request->search ?: '');
    }

    public function allRequests(AllRequestsRequest $request): array
    {
        return $this->followerRepo->allRequests($request->limit, $request->offset, $request->search ?: '');
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
