<?php

namespace App\Enums;

enum UserEnum
{
    public const AGENT = 1;
    public const AGENCY = 2;

    public const AGENT_TABLE = 'agents';
    public const AGENCY_TABLE = 'agencies';

    const USER_TYPES = [
        self::AGENT => 'agent',
        self::AGENCY => 'agency',
    ];

    const TABLES_TYPE = [
        self::AGENT => 'agents',
        self::AGENCY => 'agencies',
    ];
}
