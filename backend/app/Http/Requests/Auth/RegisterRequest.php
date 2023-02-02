<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;

/**
 * @property $email
 * @property $password
 */
class RegisterRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|string|email|max:255|unique:users',
//            'password' => 'required|string|min:6',
        ];
    }


    public function authorize(): bool
    {
        return true;
    }
}
