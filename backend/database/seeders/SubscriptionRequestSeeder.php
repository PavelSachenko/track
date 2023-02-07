<?php

namespace Database\Seeders;

use App\Models\SubscriptionRequest;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $mainAgentID = $this->getMainAgentID();
        $mainAgencyID = $this->getMainAgencyID();

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

    private function getMainAgentID(): int
    {
        return User::where('email', 'agent@gmail.com')
            ->where('type', '1')
            ->first()->id;
    }

    private function getMainAgencyID(): int
    {
        return $mainAgency = User::where('email', 'agency@gmail.com')
            ->where('type', '2')
            ->first()->id;
    }

    private function getCollectionAgentsIds(int $mainAgentID): \Illuminate\Support\Collection
    {
        return collect(
            User::where('type', '1')
                ->where('id', '<>', $mainAgentID)
                ->limit(40)
                ->get('id as user_receiver_id')
                ->toArray()
        );
    }

    private function getCollectionAgenciesIds(int $mainAgencyID): \Illuminate\Support\Collection
    {
        return collect(
            User::where('type', '2')
                ->where('id', '<>', $mainAgencyID)
                ->limit(40)
                ->get('id as user_sender_id')
                ->toArray()
        );
    }
}
