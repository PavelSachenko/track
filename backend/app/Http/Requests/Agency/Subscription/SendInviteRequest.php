<?php

namespace App\Http\Requests\Agency\Subscription;

use App\Http\Requests\BaseRequest;
use App\Rules\SelfEmailRule;

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
