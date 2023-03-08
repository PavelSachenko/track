<?php

namespace App\Repositories\PostgreSql\Agency;

use App\DTO\User\Agency\Follows\AllFollowsSearchDTO;
use App\DTO\User\Agency\Follows\AllInvitesSearchDTO;
use App\Enums\SubscriptionRequestStatus;
use App\Exceptions\BadRequestException;
use App\Models\Subscription;
use App\Models\SubscriptionRequest;
use App\Repositories\Contracts\Agency\ISubscriptionAgencyRepo;
use App\Repositories\Contracts\User\IAuthRepo;
use Illuminate\Support\Facades\DB;

class FollowerAgencyRepo implements ISubscriptionAgencyRepo
{

    private IAuthRepo $auth;

    public function __construct(IAuthRepo $auth)
    {
        $this->auth = $auth;
    }

    /**
     * @throws \Throwable
     */
    public function createInviteRequest(int $userID, string $userReceiverEmail, string $inviteMessage = null): int
    {
        $id = \DB::table('users')
            ->select('id')
            ->where('email', $userReceiverEmail)
            ->first()?->id;
        DB::beginTransaction();

        try {
            if (is_null($id)) {
                $id = $this->createEmptyUser($userReceiverEmail);
            }

            if (\DB::table('subscriptions')->where([['user_id', $id], ['user_subscriber_id', $userID]])->exists()) {
                throw new BadRequestException("You already have subscribed");
            }

            $id = DB::table('subscription_requests')->insertGetId([
                'user_sender_id' => $userID,
                'user_receiver_id' => $id,
                'message' => $inviteMessage,
                'created_at' => date('Y-m-d H:i:m')
            ]);

            DB::commit();
            return $id;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    private function createEmptyUser(string $email): int
    {
        // TODO send email invite
        return $this->auth->createEmptyUserWithEmail($email)->id;
    }

    public function totalFollows(int $userID): int
    {
        return DB::table('subscriptions')
            ->where('user_subscriber_id', $userID)
            ->count();
    }

    public function totalRequest(int $userID): int
    {
        return DB::table('subscription_requests')
            ->where('user_sender_id', $userID)
            ->where('status', '<>', SubscriptionRequestStatus::REJECT)
            ->count();
    }

    public function allFollows(AllFollowsSearchDTO $allFollowsSearchDTO): array
    {
        $query = DB::table('subscriptions', 's')
            ->join('agents as a', 'a.user_id', '=', 's.user_id')
            ->select([
                'a.user_id as id',
                'a.name',
                'a.email',
                'a.phone',
                'a.description',
                'a.img',
                'a.is_available',
                'a.created_at',
                'a.updated_at',
            ])
            ->where('s.user_subscriber_id', $allFollowsSearchDTO->userID);

        if ($allFollowsSearchDTO->search != null) {
            $query
                ->where('a.name', 'ilike', $allFollowsSearchDTO->search . '%')
                ->orWhere('a.email', 'ilike', $allFollowsSearchDTO->search . '%');
        }

        return $query->limit($allFollowsSearchDTO->limit)
            ->offset($allFollowsSearchDTO->offset)
            ->orderByDesc('s.created_at')
            ->get()->toArray();
    }

    public function allInvites(AllInvitesSearchDTO $allInvitesSearchDTO): array
    {
        $query = DB::table('subscription_requests', 'sr')
            ->leftJoin('agents as a', 'a.user_id', '=', 'sr.user_receiver_id')
            ->select([
                'sr.id',
                'sr.created_at',
                'a.email',
                'a.name',
            ])
            ->where('sr.user_sender_id', \Auth::user()->id)
            ->where('sr.status', '<>', SubscriptionRequestStatus::REJECT);

        if ($allInvitesSearchDTO->search != null) {
            $query->where('a.name', 'ilike', $allInvitesSearchDTO->search . '%')
                ->orWhere('a.email', 'ilike', $allInvitesSearchDTO->search . '%');
        }

        return $query->limit($allInvitesSearchDTO->limit)
            ->offset($allInvitesSearchDTO->offset)
            ->orderByDesc('sr.created_at')
            ->get()->toArray();
    }

    public function oneRequest(int $id): array
    {
        return (array)DB::table('subscription_requests', 'sr')
            ->leftJoin('agents as a', 'a.user_id', '=', 'sr.user_receiver_id')
            ->leftJoin('users as u', 'u.id', '=', 'sr.user_sender_id')
            ->select([
                'sr.id',
                'sr.user_receiver_id',
                'sr.created_at',
                'a.email',
                'a.name',
                'a.img',
                'sr.message',
                'u.type'
            ])
            ->where('sr.id', $id)
            ->first();
    }

    public function deleteFollow(int $userID, int $followID): bool
    {
        return DB::table('subscriptions')
            ->where('user_id', $followID)
            ->where('user_subscriber_id', $userID)
            ->delete();
    }

    public function deleteInviteFollow(int $userID, int $inviteID): bool
    {
        return DB::table('subscription_requests')
            ->where('id', $inviteID)
            ->where('user_sender_id', $userID)
            ->delete();
    }
}
