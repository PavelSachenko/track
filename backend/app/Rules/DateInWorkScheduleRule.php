<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DateInWorkScheduleRule implements Rule
{
    private string $from;
    private string $to;
    public function __construct(int $start, int $end)
    {
        $this->from = date("Y-m-d H:i:s", $start / 1000);
        $this->to = date("Y-m-d H:i:s", $end / 1000);
    }

    public function passes($attribute, $value): bool
    {
        return !\DB::table('work_schedules')
            ->where('user_id', \Auth::user()->id)
            ->where('from',  $this->from)
            ->orWhere('to',  $this->to)
            ->orWhere('to',  $this->from)
            ->orWhere('from',  $this->to)
            ->orWhereBetween('to', [$this->to, $this->from])
            ->orWhereBetween('from', [$this->to, $this->from])
            ->exists();

    }

    public function message(): string
    {
        return 'This time range already booked';
    }
}
