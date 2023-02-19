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
    public function createSubscriptionFromRequest(int $subscriptionRequestID): array
    {
        DB::beginTransaction();
        try {
            $subscriptionRequest = SubscriptionRequest::where('user_receiver_id', \Auth::user()->id)
                ->where('id', $subscriptionRequestID)
                ->first();

            if (is_null($subscriptionRequest))
                throw new BadRequestException("Subscription request not found");

            $subscription = Subscription::create([
                'user_id' => $subscriptionRequest->user_receiver_id,
                'user_subscriber_id' => $subscriptionRequest->user_sender_id,
            ])->toArray();

            $test = $subscriptionRequest->toArray();
            $subscriptionRequest->delete();
            DB::commit();
            return $test;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function setRejectStatusForRequest(int $subscriptionRequestID): array
    {
        //TODO need more clear
        $subscriptionRequest =  SubscriptionRequest::where('id', $subscriptionRequestID)->first();

         $test['updated'] = $subscriptionRequest->update(['status' => SubscriptionRequest::STATUS_TYPE_REJECT]);
         $test['user_sender_id'] = $subscriptionRequest->user_sender_id;
         $test['id'] = $subscriptionRequest->id;

        return $test;
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
