<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $token
 */
class ValidateEmailTokenRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'token' => 'required|string'
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
