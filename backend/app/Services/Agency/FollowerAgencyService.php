<?php

namespace App\Services\Agency;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agency\Follows\AllInvitesSearchDTO;
use App\Enums\Socket\Agent\Invite;
use App\Http\Requests\Agency\Subscription\AllAgencyFollowsRequest;
use App\Http\Requests\Agency\Subscription\AllAgencyInvitesRequest;
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
    public function sendInvite(int $userID, string $email, string $message = null): bool
    {
        //TODO why we need token?
        $inviteId = $this->followerRepo->createInviteRequest($email, $message ?: "hello", "token");
        $invite = $this->followerRepo->oneRequest($inviteId);
        $this->socket->sendToUser($invite['user_receiver_id'], Invite::NEW, $invite);

        return $inviteId;
    }

    public function totalFollows(int $userID): int
    {
        return $this->followerRepo->totalFollows($userID);
    }

    public function totalRequest(int $userID): int
    {
        return $this->followerRepo->totalRequest($userID);
    }

    public function allFollows(AllFollowsSearchDTO $allFollowsSearchDTO): array
    {
        return $this->followerRepo->allFollows($allFollowsSearchDTO);
    }

    public function allInvites(AllInvitesSearchDTO $allInvitesSearchDTO): array
    {
        return $this->followerRepo->allInvites($allInvitesSearchDTO);
    }

    public function deleteFollow(int $userID, int $followID): bool
    {
        return $this->followerRepo->deleteFollow($userID, $followID);
    }

    public function deleteInvite(int $userID, int $inviteID): bool
    {
        return $this->followerRepo->deleteInviteFollow($userID, $inviteID);
    }
}
