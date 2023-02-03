<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class EmailRegistrationRequest extends FormRequest
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
