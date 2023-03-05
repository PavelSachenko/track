<?php

namespace App\Http\Requests\Agency\Subscription;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property int $limit
 * @property int $offset
 * @property string $search
 * @property string $status
 */
class AllFollowsRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        // set default value
        $this->merge(['limit' => $this->limit ?: 20, 'offset' => $this->offset ?: 0]);
    }

    public function rules(): array
    {
        return [
            'limit' => ['gt:0', 'integer'],
            'offset' => ['gt:-1', 'integer'],
            'search' => ['string', 'max:255'],
            'status' => ['numeric', Rule::in([1, 2])],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
