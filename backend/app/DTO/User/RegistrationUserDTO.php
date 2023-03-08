<?php

namespace App\DTO\User;

readonly class RegistrationUserDTO
{
    public function __construct(
        public int $ID,
        public string $name,
        public int $type,
        public string $password,
        public string $token,
        public ?string $phone,
        public ?string $url,
        public ?string $description,
    )
    {
    }
}
