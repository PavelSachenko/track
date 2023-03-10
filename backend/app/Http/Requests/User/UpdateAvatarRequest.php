<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

/**
 * @property $img
 */
class UpdateAvatarRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'img' => ['required', 'image'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
