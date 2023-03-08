<?php

namespace App\DTO\User;

readonly class DefaultAgentDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public bool $isAvailable,
        public ?string $phone,
        public ?string $description,
        public ?string $img,
        public ?string $created_at,
        public ?string $updated_at,
    )
    {
    }
}
