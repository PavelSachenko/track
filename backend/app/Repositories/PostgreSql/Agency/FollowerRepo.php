<?php

namespace App\Repositories\PostgreSql\Agency;


use App\Exceptions\BadRequestException;
use App\Models\SubscriptionRequest;
use App\Repositories\Contracts\User\AuthRepo;
use Illuminate\Support\Facades\DB;

class FollowerRepo implements \App\Repositories\Contracts\Agency\InviteRepo
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

}