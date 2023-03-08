<?php

namespace App\Repositories\PostgreSql\Agency;

use App\Models\WorkSchedule;
use App\Models\WorkTime;
use App\Repositories\Contracts\Agent\IScheduleAgentRepo as IAgentScheduleRepo;
use App\Repositories\PostgreSql\Agent\ScheduleAgentRepo as AgentScheduleRepo;
use App\Repositories\Contracts\Agency\IScheduleAgencyRepo;
use Illuminate\Support\Facades\DB;

class ScheduleAgencyRepo implements IScheduleAgencyRepo
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
            $worksRecords = $this->agentScheduleRepo->scheduleForOneDay($agent->id, $dateFrom, $dateTo);
            $agent->work_time = $worksRecords['date'];
            $agent->schedule_events = $worksRecords['schedule'];
        }

        return $agentsSchedules;
    }
}
