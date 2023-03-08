<?php

namespace App\DTO\User\Factory;

use App\DTO\User\DefaultAgentDTO;
use App\DTO\User\RegistrationUserDTO;
use Illuminate\Support\Facades\Hash;

class UserDTOFactory implements IUserDTOFactory
{

    public function createAgentUserDTO(array $user): DefaultAgentDTO
    {
        return new DefaultAgentDTO(
            id: $user['id'],
            name: $user['name'],
            email: $user['email'],
            isAvailable: $user['is_available'],
            phone: $user['phone'] ?? null,
            description: $user['description'] ?? null,
            img: $user['img'] ?? null,
            created_at: $user['created_at'] ?? null,
            updated_at: $user['updated_at'] ?? null,
        );
    }

    public function createRegistrationUserDTO(int $userID, array $user): RegistrationUserDTO
    {
        return new RegistrationUserDTO(
            ID: $userID,
            name: $user['name'],
            type: $user['type'],
            password: Hash::make($user['password']),
            token: $user['token'],
            phone: $user['phone'] ?? null,
            url: $user['url'] ?? null,
            description: $user['description'] ?? null,
        );
    }
}
