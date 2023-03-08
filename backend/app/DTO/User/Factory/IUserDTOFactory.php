<?php

namespace App\DTO\User\Factory;

use App\DTO\User\DefaultAgentDTO;

interface IUserDTOFactory
{
    public function createAgentUserDTO(array $user): DefaultAgentDTO;
}
