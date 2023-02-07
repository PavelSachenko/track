<?php

namespace App\Repositories\PostgreSql\Agent;


use App\Exceptions\BadRequestException;
use App\Models\Subscription;
use App\Models\SubscriptionRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class SubscriptionRepo implements \App\Repositories\Contracts\Agent\SubscriptionRepo
{
    /**
     * @throws \Throwable
     */
    public function createSubscriptionFromRequest(int $subscriptionRequestID): bool
    {
        DB::beginTransaction();
        try {
            $subscriptionRequest = SubscriptionRequest::where('user_receiver_id', \Auth::user()->id)
                ->where('id', $subscriptionRequestID)
                ->first();

            if (is_null($subscriptionRequest))
                throw new BadRequestException("Subscription request not found");

            $wasRecentlyCreated = Subscription::create([
                'user_id' => $subscriptionRequest->user_receiver_id,
                'user_subscriber_id' => $subscriptionRequest->user_sender_id,
            ])->wasRecentlyCreated;

            $subscriptionRequest->delete();
            DB::commit();
            return $wasRecentlyCreated;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function setRejectStatusForRequest(int $subscriptionRequestID): bool
    {
        return (bool)DB::table('subscription_requests')
            ->where('id', $subscriptionRequestID)
            ->update(['status' => SubscriptionRequest::STATUS_TYPE_REJECT]);
    }


    public function countSubscriber(): int
    {
        return DB::table('subscriptions')
            ->where('user_id', \Auth::user()->id)
            ->count();
    }

    public function countRequestToSubscribe(): int
    {
        return DB::table('subscription_requests')
            ->where('user_receiver_id', \Auth::user()->id)
            ->where('status', '<>', SubscriptionRequest::STATUS_TYPE_REJECT)
            ->count();
    }

    public function getAllSubscriber(int $limit, int $offset, string $search): array
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
            ->where('s.user_id', \Auth::user()->id);

        if ($search != '') {
            $query->where('a.name', 'ilike', $search . '%')
                ->orWhere('a.email', 'ilike', $search . '%');
        }

        return $query->limit($limit)
            ->offset($offset)
            ->orderByDesc('s.created_at')
            ->get()->toArray();
    }

    public function getAllRequests(int $limit, int $offset, string $search): array
    {
        $query = DB::table('subscription_requests', 'sr')
            ->leftJoin('agencies as a', 'a.user_id', '=', 'sr.user_sender_id')
            ->select([
                'sr.id',
                'sr.created_at',
                'a.email',
                'a.name',
            ])
            ->where('sr.user_receiver_id', \Auth::user()->id);

        if ($search != '') {
            $query->where('a.name', 'ilike', $search . '%')
                ->orWhere('a.email', 'ilike', $search . '%');
        }

        return $query->limit($limit)
            ->offset($offset)
            ->orderByDesc('sr.created_at')
            ->get()->toArray();
    }


}
