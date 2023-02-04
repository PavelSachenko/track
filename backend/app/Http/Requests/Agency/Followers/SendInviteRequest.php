<?php

namespace App\Http\Requests\Agency\Followers;

use App\Http\Requests\BaseRequest;
use App\Rules\SelfEmailRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $email
 * @property ?string $message
 */
class SendInviteRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required','email', new SelfEmailRule()],
            'message' => ['string','max:255']
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
