<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;

class RegistrationRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
//            'email' => ['string', 'email', 'max:255', 'unique:users'],
            'phone' => ['string', 'regex:/^[?+]?\d{7,14}$/', 'min:7', 'max:14'],
            'url' => ['url'],
            'type' => ['required', 'integer'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'token' => ['required', 'string']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
