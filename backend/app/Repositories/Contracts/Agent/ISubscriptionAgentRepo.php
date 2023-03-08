<?php

namespace App\Repositories\Contracts\Agent;

interface ISubscriptionAgentRepo
{
    public function createSubscriptionFromRequest(int $subscriptionRequestID): array;

    public function setRejectStatusForRequest(int $subscriptionRequestID): array;

    public function totalSubscriber(): int;

    public function totalRequestToSubscribe(): int;

    public function allSubscriber(int $limit, int $offset, string $search): array;

    public function allRequests(int $limit, int $offset, string $search): array;
}
