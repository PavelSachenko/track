<?php

namespace App\Repositories\PostgreSql\Agency;


use App\Exceptions\BadRequestException;
use App\Models\SubscriptionRequest;
use App\Repositories\Contracts\Agency\SubscriptionRepo;
use App\Repositories\Contracts\User\AuthRepo;
use Illuminate\Support\Facades\DB;

class FollowerRepo implements SubscriptionRepo
{

    private AuthRepo $auth;

    public function __construct(AuthRepo $auth)
    {
        $this->auth = $auth;
    }

    /**
     * @throws \Throwable
     */
    public function createInviteRequest(string $userReceiverEmail, string $inviteMessage, string $token): bool
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

            if (\DB::table('subscriptions')->where([['user_id', $id], ['user_subscriber_id', \Auth::user()->id]])->exists())
                throw new BadRequestException("You already have subscribed");

            $isCreated = DB::table('subscription_requests')->insertOrIgnore([
                'user_sender_id' => \Auth::user()->id,
                'user_receiver_id' => $id,
                'message' => $inviteMessage,
                'token' => $token,
                'created_at' => date('Y-m-d H:i:m')
            ]);

            DB::commit();
            return $isCreated;


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

    public function countFollows(): int
    {
        return DB::table('subscriptions')
            ->where('user_subscriber_id', \Auth::user()->id)
            ->count();
    }

    public function countRequest(): int
    {
        return DB::table('subscription_requests')
            ->where('user_sender_id', \Auth::user()->id)
            ->count();
    }

    public function getAllFollows(int $limit, int $offset, string $search): array
    {
        return DB::table('subscriptions', 's')
            ->leftJoin('agents as a', 'a.user_id', '=', 's.user_id')
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
            ->where('s.user_id', \Auth::user()->id)
            ->where('a.name', 'like',  $search . '%')
            ->orWhere('a.email', 'like',  $search . '%')
            ->limit($limit)
            ->offset($offset)
            ->orderByDesc('s.created_at')
            ->get()->toArray();
    }
}
