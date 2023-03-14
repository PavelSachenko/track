<?php

namespace Database\Seeders;

use App\Enums\AgencyEnum;
use App\Enums\AgentEnum;
use App\Models\Subscription;
use App\Models\SubscriptionRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    public function run()
    {
        if (strtolower(config('app.env')) == 'prod'){
            return;
        }
        $mainAgentID = AgentEnum::localMainAgentID();
        $mainAgencyID = AgencyEnum::localMainAgencyID();

        //получаем айдишки юзеров, которые агенства и не имеют реквестов для основного агента
        $arrayForCreateAgentSubscription = User::where('type', '2')
            ->where('id', '<>', $mainAgencyID)
            ->whereNotIn(
                'id',
                SubscriptionRequest::select('user_sender_id')
                    ->where('user_receiver_id', $mainAgentID)
                    ->get()
                    ->collect()
                    ->pluck('user_sender_id')
                    ->toArray()
            )->limit(40)->get('id as user_subscriber_id')
            ->collect()
            ->map(function ($array) use ($mainAgentID){
                $array['user_id'] = $mainAgentID;
                $array['created_at'] = date('Y-m-d H:i:s');
                return $array;
            })->toArray();

        $arrayForCreateAgencySubscription = User::where('type', '1')
            ->where('id', '<>', $mainAgentID)
            ->whereNotIn(
                'id',
                SubscriptionRequest::select('user_receiver_id')
                    ->where('user_sender_id', $mainAgencyID)
                    ->get()
                    ->collect()
                    ->pluck('user_receiver_id')
                    ->toArray()
            )->limit(40)->get('id as user_id')
            ->collect()
            ->map(function ($array) use ($mainAgencyID){
                $array['user_subscriber_id'] = $mainAgencyID;
                $array['created_at'] = date('Y-m-d H:i:s');
                return $array;
            })->toArray();

        Subscription::insert($arrayForCreateAgentSubscription);
        Subscription::insert($arrayForCreateAgencySubscription);

    }
}
