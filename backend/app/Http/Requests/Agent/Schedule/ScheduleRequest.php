<?php

namespace App\Http\Requests\Agent\Schedule;

use App\Http\Requests\BaseRequest;

/**
 * @property int $date
 */
class ScheduleRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'date' => ['required', 'numeric']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
