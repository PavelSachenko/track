<?php

namespace App\Http\Requests\Agency\Subscription;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agency\Follows\Factory\IFollowAgencyDTOFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @property int $limit
 * @property int $offset
 * @property string $search
 * @property string $status
 */
class AllAgencyFollowsRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'limit' => ['gt:0', 'integer'],
            'offset' => ['gt:-1', 'integer'],
            'search' => ['string', 'max:255'],
            'status' => ['numeric', Rule::in([1, 2])],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @param IFollowAgencyDTOFactory $DTOFactory
     * @return AllFollowsSearchDTO
     */
    public function getDTO(): AllFollowsSearchDTO
    {
        return $DTOFactory->createAllFollowSearchDTO($this);
    }
}
