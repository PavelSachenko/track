<?php

namespace App\Services\Contracts\Agent;

interface Follower extends Invite
{
    public function countFollowers(): int;
}
