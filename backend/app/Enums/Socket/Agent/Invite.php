<?php

namespace App\Enums\Socket\Agent;

enum Invite
{
    const NEW = 'new_invite';
    const DECLINE = 'decline_invite';
    const ACCEPT = 'accept_invite';
}
