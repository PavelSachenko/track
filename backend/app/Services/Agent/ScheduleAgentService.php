<?php

namespace App\Services\Agent;

use App\DTO\User\Agent\Schedule\AddAgentWorkRecordDTO;
use App\DTO\User\Agent\Schedule\UpdateAgentWorkRecordDTO;
use App\Repositories\Contracts\Agent\IScheduleAgentRepo;
use App\Services\Contracts\Socket\ISocket;
use App\Enums\Socket\Agent\Schedule as EnumSchedule;

class ScheduleAgentService implements \App\Services\Contracts\Agent\IScheduleAgentService
{
    private IScheduleAgentRepo $scheduleRepo;
    private ISocket $socket;

    public function __construct(IScheduleAgentRepo $repo, ISocket $socket)
    {
        $this->scheduleRepo = $repo;
        $this->socket = $socket;
    }

    public function oneDay(int $userID, int $date): array
    {
        $date = date("Y-m-d", $date / 1000);
        $from = $date . ' 00:00:00';
        $to = date('Y-m-d', strtotime("+1 day", strtotime($date))) . ' 00:00:00';

        return $this->scheduleRepo->scheduleForOneDay($userID, $from, $to);
    }

    public function addWorkRecord(AddAgentWorkRecordDTO $addAgentWorkRecordDTO): array
    {
        $workRecord = $this->scheduleRepo->addWorkRecord($addAgentWorkRecordDTO,
            date("Y-m-d H:i:s", $addAgentWorkRecordDTO->start / 1000),
            date("Y-m-d H:i:s", $addAgentWorkRecordDTO->end / 1000),
        );

        $this->socket->sendToUser(\Auth::user()->id, EnumSchedule::ADD_EVENT, $workRecord);

        return $workRecord;
    }

    public function updateWorkRecord(UpdateAgentWorkRecordDTO $updateAgentWorkRecordDTO): array
    {
        return $this->scheduleRepo->updateWorkRecord(
            $updateAgentWorkRecordDTO,
            date("Y-m-d H:i:s", $updateAgentWorkRecordDTO->start / 1000),
            date("Y-m-d H:i:s", $updateAgentWorkRecordDTO->end / 1000),
        );
    }

    public function deleteWorkRecord(int $userID, int $id): bool
    {
        return $this->scheduleRepo->deleteWorkRecord($userID, $id);
    }
}
