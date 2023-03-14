<?php

namespace App\Http\Requests\Auth;

use App\Exceptions\InvalidTokenException;
use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;
use Laravel\Sanctum\PersonalAccessToken;

/**
 * @property string $token
 * @property string $password
 */
class ResetPasswordRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'token' => ['required', 'string'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
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
