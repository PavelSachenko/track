<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class SelfEmailRule implements Rule
{
    public function passes($attribute, $value): bool
    {
        if ($attribute == 'email' && \Auth::user()->email == $value) {
            return false;
        }
        return true;
    }

    public function message(): string
    {
        return 'can\'t send invite for myself';
    }
}
