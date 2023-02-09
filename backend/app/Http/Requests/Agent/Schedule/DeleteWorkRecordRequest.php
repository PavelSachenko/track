<?php

namespace App\Http\Requests\Agent\Schedule;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

class DeleteWorkRecordRequest extends BaseRequest
{
    public function rules(): array
    {
        return [

        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
