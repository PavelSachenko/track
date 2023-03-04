<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DateInWorkScheduleRule implements Rule
{
    private string $from;
    private string $to;
    private ?int $workRecordID;
    public function __construct(?int $start, ?int $end, $workRecordID = null)
    {
        $this->from = date("Y-m-d H:i:s", ($start / 1000));
        $this->to = date("Y-m-d H:i:s", ($end / 1000));
        $this->workRecordID = $workRecordID;
    }

    public function passes($attribute, $value): bool
    {
        return !\DB::table('work_schedules')
            ->where('user_id', \Auth::user()->id)
            ->where('id', '<>', $this->workRecordID)
            ->whereRaw('("from", "to") OVERLAPS (?, ?)', [$this->from, $this->to])
            ->exists();
    }

    public function message(): string
    {
        return 'This time range already booked';
    }
}
