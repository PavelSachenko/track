<?php

namespace App\Enums;

enum WorkScheduleEnum
{
    public const TYPE_WORK = 1;
    public const TYPE_REST = 2;
    public const TYPE_REQUEST = 3;

    public const ALL_TYPE = [
        'work' => 1,
        'rest' => 2,
        'request' => 3
    ];
}
