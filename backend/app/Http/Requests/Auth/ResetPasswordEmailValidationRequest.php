<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;

/**
 * @property string $email
 */
class ResetPasswordEmailValidationRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'exists:users']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
