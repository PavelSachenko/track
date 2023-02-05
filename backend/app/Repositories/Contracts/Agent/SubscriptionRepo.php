<?php

namespace App\Repositories\Contracts\Agent;

interface SubscriptionRepo
{
    public function createSubscriptionFromRequest(int $subscriptionRequestID): bool;
    public function changeStatusSubscriptionFromRequest(int $subscriptionRequestID): bool;

}
