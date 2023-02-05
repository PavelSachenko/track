<?php

namespace App\Http\Requests\Agent\Subscription;

use App\Http\Requests\BaseRequest;
/**
 * @property int $id
 */
class DecisionInviteRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'gt:0']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
