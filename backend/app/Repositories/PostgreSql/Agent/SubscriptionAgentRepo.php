<?php

namespace App\Repositories\PostgreSql\Agent;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agent\Followers\AllInviteAgentSearchDTO;
use App\DTO\User\DefaultAgentDTO;
use App\Enums\SubscriptionRequestStatus;
use App\Exceptions\BadRequestException;
use App\Models\Agent;
use App\Models\Subscription;
use App\Models\SubscriptionRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class SubscriptionAgentRepo implements \App\Repositories\Contracts\Agent\ISubscriptionAgentRepo
{
    /**
     * @throws \Throwable
     */
    public function createSubscriptionFromRequest(DefaultAgentDTO $agentDTO, int $subscriptionInviteID): array
    {
        DB::beginTransaction();
        try {
            $subscriptionRequest = SubscriptionRequest::where('user_receiver_id', $agentDTO->id)
                ->where('id', $subscriptionInviteID)
                ->first();

            if (is_null($subscriptionRequest)) {
                throw new BadRequestException("Subscription request not found");
            }

            $createdSubscriptionId = Subscription::create([
                'user_id' => $subscriptionRequest->user_receiver_id,
                'user_subscriber_id' => $subscriptionRequest->user_sender_id,
            ])->id;

            $subscriptionRequest->delete();
            DB::commit();

            return [
                'subscription_id' => $createdSubscriptionId,
                'user_subscriber_id' => $subscriptionRequest->user_sender_id
            ];
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function setRejectStatusForInvite(int $userID, int $subscriptionInviteID): array
    {
        $subscriptionRequest = SubscriptionRequest::where('id', $subscriptionInviteID)
            ->where('user_receiver_id', $userID)
            ->first();

        $response['updated'] = $subscriptionRequest->update(['status' => SubscriptionRequestStatus::REJECT]);
        $response['user_sender_id'] = $subscriptionRequest->user_sender_id;
        $response['subscription_request_id'] = $subscriptionRequest->id;

        return $response;
    }


    public function totalSubscriber(int $userID): int
    {
        return DB::table('subscriptions')
            ->where('user_id', $userID)
            ->count();
    }

    public function totalInvitesToSubscribe(int $userID): int
    {
        return DB::table('subscription_requests')
            ->where('user_receiver_id', $userID)
            ->where('status', '<>', SubscriptionRequestStatus::REJECT)
            ->count();
    }

    public function allSubscriber(AllFollowsSearchDTO $followerSearchDTO): array
    {
        $query = DB::table('subscriptions', 's')
            ->leftJoin('agencies as a', 'a.user_id', '=', 's.user_subscriber_id')
            ->select([
                'a.user_id as id',
                'a.name',
                'a.email',
                'a.phone',
                'a.description',
                'a.img',
                'a.url',
                'a.created_at',
                'a.updated_at',
            ])
            ->where('s.user_id', $followerSearchDTO->userID);

        if ($followerSearchDTO->search != null) {
            $query->where('a.name', 'ilike', $followerSearchDTO->search . '%')
                ->orWhere('a.email', 'ilike', $followerSearchDTO->search . '%');
        }

        return $query->limit($followerSearchDTO->limit)
            ->offset($followerSearchDTO->offset)
            ->orderByDesc('s.created_at')
            ->get()->toArray();
    }

    public function allRequests(AllInviteAgentSearchDTO $inviteSearchDTO): array
    {
        $query = DB::table('subscription_requests', 'sr')
            ->leftJoin('agencies as a', 'a.user_id', '=', 'sr.user_sender_id')
            ->leftJoin('users as u', 'u.id', '=', 'sr.user_sender_id')
            ->select([
                'sr.id',
                'sr.created_at',
                'a.email',
                'a.name',
                'a.img',
                'sr.message',
                'u.type'
            ])
            ->where('sr.user_receiver_id', $inviteSearchDTO->userID)
            ->where('sr.status', '<>', SubscriptionRequestStatus::REJECT);

        if ($inviteSearchDTO->search != null) {
            $query->where('a.name', 'ilike', $inviteSearchDTO->search . '%')
                ->orWhere('a.email', 'ilike', $inviteSearchDTO->search . '%');
        }

        return $query->limit($inviteSearchDTO->limit)
            ->offset($inviteSearchDTO->offset)
            ->orderByDesc('sr.created_at')
            ->get()->toArray();
    }
}
