<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

/**
 * @property ?string $name
 * @property ?string $description
 * @property ?string $phone
 * @property ?string $url
 */
class SettingsRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'description' => ['string', 'max:500'],
            'phone' => ['string', 'regex:/^[?+]?\d{7,14}$/', 'min:7', 'max:14'],
            'url' => ['url'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
