<?php

namespace App\Enums\Socket\Agent;

enum Invite
{
    public const NEW = 'new_invite';
    public const DECLINE = 'decline_invite';
    public const ACCEPT = 'accept_invite';
}
