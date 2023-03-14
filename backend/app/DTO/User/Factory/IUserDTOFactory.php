<?php

namespace App\DTO\User\Factory;

use App\DTO\User\DefaultAgentDTO;
use App\DTO\User\RegistrationUserDTO;

interface IUserDTOFactory
{
    public function createAgentUserDTO(array $user): DefaultAgentDTO;

    public function createRegistrationUserDTO(int $userID, array $user): RegistrationUserDTO;
}
