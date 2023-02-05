<?php

namespace App\Repositories\PostgreSql\Agent;


use App\Exceptions\BadRequestException;
use App\Models\Subscription;
use App\Models\SubscriptionRequest;
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

    public function changeStatusSubscriptionFromRequest(int $subscriptionRequestID): bool
    {
        return (bool)DB::table('subscription_requests')
            ->where('id', $subscriptionRequestID)
            ->update(['status' => SubscriptionRequest::STATUS_TYPE_REJECT]);
    }
}
