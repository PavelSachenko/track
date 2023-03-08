<?php

namespace App\Http\Requests\Agency\Subscription;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property int $limit
 * @property int $offset
 * @property string $search
 */
class AllAgencyInvitesRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'limit' => ['gt:0', 'integer'],
            'offset' => ['gt:-1', 'integer'],
            'search' => ['string', 'max:255'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
