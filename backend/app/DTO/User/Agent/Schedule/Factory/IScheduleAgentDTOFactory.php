<?php

namespace App\DTO\User\Agent\Schedule\Factory;

use App\DTO\User\Agent\Schedule\AddAgentWorkRecordDTO;
use App\DTO\User\Agent\Schedule\UpdateAgentWorkRecordDTO;
use App\Http\Requests\Agent\Schedule\AddWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\UpdateWorkRecordRequest;

interface IScheduleAgentDTOFactory
{
    public function createAddWorkRecordDTO(AddWorkRecordRequest $request): AddAgentWorkRecordDTO;

    public function createUpdateWorkRecordDTO(UpdateWorkRecordRequest $request): UpdateAgentWorkRecordDTO;
}
