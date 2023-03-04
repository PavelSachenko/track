<?php

namespace App\Http\Requests\Agency\Schedule;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property int $date
 * @property string $search
 */
class AllRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'date' => ['required', 'numeric'],
            'search' => ['nullable', 'string']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
