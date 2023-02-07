<?php

namespace App\Repositories\Contracts\Agent;

interface SubscriptionRepo
{
    public function createSubscriptionFromRequest(int $subscriptionRequestID): bool;
    public function setRejectStatusForRequest(int $subscriptionRequestID): bool;
    public function countSubscriber(): int;
    public function countRequestToSubscribe(): int;
    public function getAllSubscriber(int $limit, int $offset, string $search): array;
    public function getAllRequests(int $limit, int $offset, string $search): array;
}
