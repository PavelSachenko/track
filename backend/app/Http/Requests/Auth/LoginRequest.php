<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $password
 * @property string $email
 */
class LoginRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|string|email|',
            'password' => 'required|string',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
