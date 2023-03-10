<?php

namespace App\Http\Requests\Agent\Settings;

use App\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;

/**
 * @property string mode
 * @property string times
 */
class UpdateWorkingScheduleRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'mode' => ['required','string', Rule::in(['custom', 'every_day', 'weekdays'])],
            'times' => ['required', 'json']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
