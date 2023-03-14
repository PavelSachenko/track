<?php

namespace Database\Seeders;

use App\Enums\AgencyEnum;
use App\Enums\AgentEnum;
use App\Models\SubscriptionRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class SubscriptionRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (strtolower(config('app.env')) == 'prod'){
            return;
        }

        $mainAgentID = AgentEnum::localMainAgentID();
        $mainAgencyID = AgencyEnum::localMainAgencyID();

        $subscriptionRequestsForAgency = $this->getCollectionAgentsIds($mainAgentID)->map(function ($array) use ($mainAgencyID) {
            $array['user_sender_id'] = $mainAgencyID;
            $array['created_at'] = date('Y-m-d H:i:s');
            $array['status'] = rand(1, 2);
            $array['token'] = fake()->word;
            return $array;
        });

        $subscriptionRequestsForAgent = $this->getCollectionAgenciesIds($mainAgencyID)->map(function ($array) use ($mainAgentID) {
            $array['user_receiver_id'] = $mainAgentID;
            $array['created_at'] = date('Y-m-d H:i:s');
            $array['status'] = rand(1, 2);
            $array['token'] = fake()->word;
            return $array;
        });

        SubscriptionRequest::insert($subscriptionRequestsForAgency->toArray());
        SubscriptionRequest::insert($subscriptionRequestsForAgent->toArray());

    }

    private function getCollectionAgentsIds(int $mainAgentID): \Illuminate\Support\Collection
    {
        return User::where('type', '1')
                ->where('id', '<>', $mainAgentID)
                ->limit(40)
                ->get('id as user_receiver_id')
                ->collect();
    }

    private function getCollectionAgenciesIds(int $mainAgencyID): \Illuminate\Support\Collection
    {
        return User::where('type', '2')
                ->where('id', '<>', $mainAgencyID)
                ->limit(40)
                ->get('id as user_sender_id')
                ->collect();
    }
}
