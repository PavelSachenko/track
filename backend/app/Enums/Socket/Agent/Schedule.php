<?php

namespace App\Enums\Socket\Agent;

enum Schedule
{
    public const ADD_EVENT = "add_work_event";
    public const DELETE_EVENT = "delete_work_event";
    public const UPDATE_EVENT = "update_work_event";
}
