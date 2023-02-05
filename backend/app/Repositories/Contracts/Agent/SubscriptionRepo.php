<?php

namespace App\Repositories\Contracts\Agent;

interface SubscriptionRepo
{
    public function createSubscriptionFromRequest(int $subscriptionRequestID): bool;
    public function changeStatusSubscriptionFromRequest(int $subscriptionRequestID): bool;
    public function countSubscriber(): int;
    public function countRequestToSubscribe(): int;
    public function getAllSubscriber(array $searchParams): array;

}
