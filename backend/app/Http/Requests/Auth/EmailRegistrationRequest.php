<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;

/**
 * @property string $email
 */
class EmailRegistrationRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'email' => ['string', 'email', 'max:255', 'unique:users'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
