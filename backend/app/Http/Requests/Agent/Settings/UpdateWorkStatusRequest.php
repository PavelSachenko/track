<?php

namespace App\Http\Requests\Agent\Settings;

use App\Http\Requests\BaseRequest;

/**
 * @property boolean $is_available
 */
class UpdateWorkStatusRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'is_available' => ['required', 'boolean']
        ];
    }

    public function messages(): array
    {
        return [
            'is_available.required' => 'The is_available field is required.',
            'is_available.boolean' => 'The is_available field must be 1 or 0.'
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
