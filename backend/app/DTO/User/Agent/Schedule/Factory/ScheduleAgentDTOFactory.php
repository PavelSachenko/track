<?php

namespace App\DTO\User\Agent\Schedule\Factory;

use App\DTO\User\Agent\Schedule\AddAgentWorkRecordDTO;
use App\DTO\User\Agent\Schedule\UpdateAgentWorkRecordDTO;
use App\Enums\WorkScheduleEnum;
use App\Http\Requests\Agent\Schedule\AddWorkRecordRequest;
use App\Http\Requests\Agent\Schedule\UpdateWorkRecordRequest;

class ScheduleAgentDTOFactory implements IScheduleAgentDTOFactory
{

    public function createAddWorkRecordDTO(AddWorkRecordRequest $request): AddAgentWorkRecordDTO
    {
        return new AddAgentWorkRecordDTO(
            userID: $request->user()->id,
            start: $request->start,
            end: $request->end,
            type: WorkScheduleEnum::ALL_TYPE[$request->type],
            agencyID: $request?->agencyId,
            description: $request?->description,
        );
    }

    public function createUpdateWorkRecordDTO(UpdateWorkRecordRequest $request): UpdateAgentWorkRecordDTO
    {
        return new UpdateAgentWorkRecordDTO(
            ID: $request->id,
            userID: $request->user()->id,
            start: $request->start,
            end: $request->end,
            type: WorkScheduleEnum::ALL_TYPE[$request->type],
            agencyID: $request?->agencyId,
            description: $request?->description,
        );
    }
}
