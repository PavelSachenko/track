<?php

namespace App\Repositories\PostgreSql\Agency;

use App\Models\WorkSchedule;
use App\Models\WorkTime;
use App\Repositories\Contracts\Agent\ScheduleRepo as IAgentScheduleRepo;
use App\Repositories\PostgreSql\Agent\ScheduleRepo as AgentScheduleRepo;
use App\Repositories\Contracts\Agency\IScheduleRepo;
use Illuminate\Support\Facades\DB;

class ScheduleRepo implements IScheduleRepo
{
    private IAgentScheduleRepo $agentScheduleRepo;

    public function __construct()
    {
        $this->agentScheduleRepo = new AgentScheduleRepo();
    }

    public function all(int $userID, string $dateFrom, string $dateTo, string $search = null): array
    {
        $agentsSchedules = DB::table('agents')
            ->select(
                'agents.user_id as id',
                'agents.name',
                'agents.email',
                'users.type',
            )
            ->leftJoin('users', 'agents.user_id', '=', 'users.id')
            ->leftJoin('subscriptions', 'agents.user_id', '=', 'subscriptions.user_id')
            ->where('subscriptions.user_subscriber_id', $userID);

        if ($search != null) {
            $agentsSchedules->where('agents.name', 'ilike', $search . '%')
                ->orWhere('agents.email', 'ilike', $search . '%');
        }
        $agentsSchedules = $agentsSchedules->get()->toArray();


        foreach ($agentsSchedules as $agent) {
            $worksRecords = $this->agentScheduleRepo->getScheduleForOneDay($agent->id, $dateFrom, $dateTo);
            $agent->work_time = $worksRecords['date'];
            $agent->schedule_events = $worksRecords['schedule'];
        }

        return $agentsSchedules;
    }
}
