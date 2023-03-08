<?php

namespace App\Http\Requests\Auth;

use App\Exceptions\InvalidTokenException;
use App\Http\Requests\BaseRequest;
use Laravel\Sanctum\PersonalAccessToken;

/**
 * @property integer $type
 * @property string $name
 * @property string $password
 * @property string $token
 * @property ?string $phone
 * @property ?string $url
 * @property ?string $description
 * @property $img
 *
 */
class RegistrationRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'integer'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'token' => ['required', 'string'],
            'img' => ['nullable', 'image'],
            'phone' => ['string', 'regex:/^[?+]?\d{7,14}$/', 'min:7', 'max:14'],
            'url' => ['url'],
            'description' => ['string', 'max:500'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @param string $token
     * @return PersonalAccessToken
     */
    public function getPersonalAccessToken(string $token): PersonalAccessToken
    {
        $personalToken = PersonalAccessToken::findToken($token);
        if (is_null($personalToken)) {
            throw new InvalidTokenException();
        }

        \Auth::setUser($personalToken->tokenable);

        return $personalToken;
    }
}
