<?php

namespace App\Http\Requests\Agent\Subscription;

use App\Http\Requests\BaseRequest;

/**
 * @property int $limit
 * @property int $offset
 * @property string $search
 */
class AllFollowersRequest extends BaseRequest
{
    protected function prepareForValidation()
    {
        // set default value
        $this->merge(['limit' => $this->limit? : 20, 'offset' => $this->offset? : 0]);
    }

    public function rules(): array
    {
        return [
            'limit' => ['gt:0', 'integer'],
            'offset' => ['gt:-1', 'integer'],
            'search' => ['string', 'max:255'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

}