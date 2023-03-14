<?php

namespace App\DTO\Settings;

readonly class UpdateGeneralSettingsDTO
{
    public function __construct(
        public int $userID,
        public int $userType,
        public ?string $name = null,
        public ?string $description = null,
        public ?string $phone = null,
        public ?string $url = null,
    )
    {
    }
}
