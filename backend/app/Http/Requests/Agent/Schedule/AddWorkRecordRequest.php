<?php

namespace App\Http\Requests\Agent\Schedule;

use App\Http\Requests\BaseRequest;
use App\Rules\DateInWorkScheduleRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property int $start
 * @property int $end
 * @property ?int $agencyId
 * @property string $type
 * @property ?string $description
 */
class AddWorkRecordRequest extends BaseRequest
{
    public function rules(): array
    {
        $dateValidate = new DateInWorkScheduleRule($this->request->get('start'), $this->request->get('end'));

        return [
            'start' => ['required', 'numeric', 'min:' . strtotime(date('Y-m-d 00:00:00')) * 1000, $dateValidate],
            'end' => ['required', 'numeric', 'gte:start', $dateValidate],
            'description' => ['string'],
            'type' => ['required', 'string', 'in:work,rest'],
            'agencyId' => ['numeric']
        ];
    }

    public function messages()
    {
        return [
            'start.min' => "The start time cannot be less than the current",
            'end.gte' => "The end time cannot be less than start time",
            'type.in' => "The type must be work or rest",
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
