<?php

namespace App\Repositories\PostgreSql\User;

use App\Exceptions\InvalidTokenException;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AuthRepo implements \App\Repositories\Contracts\User\AuthRepo
{
    public function createEmptyUserWithEmail(string $email): \Eloquent|Model
    {
        return User::create([
            'email' => $email,
        ]);
    }

    public function setPassword(int $userID, string $password): bool
    {
        return DB::table('users')
            ->where('id', $userID)
            ->update(['password' => Hash::make($password)]);
    }

    public function getOneByField(string $field, $value): \Eloquent|Model
    {
        return User::where($field, $value)->firstOrFail();
    }

    public function setValidatedEmail(string $token): string
    {
        $personalToken = PersonalAccessToken::findToken($token);
        if (is_null($personalToken)) {
            throw new InvalidTokenException();
        }

        $user = $this->getOneByField('id', $personalToken->tokenable_id);
        $user->email_verified_at = date("Y-m-d H:i:s");
        $user->save();


        return $user->email;
    }


    public function createSpecialUserAndSetPassword(int $userID, int $userType, array $params): Model|\Eloquent
    {
        DB::beginTransaction();
        try {
            DB::table('users')
                ->where('id', $userID)
                ->update([
                    'password' => Hash::make($params['password']),
                    'email_verified_at' => date('Y-m-d H:i:s'),
                    'type' => $userType
                ]);
            $user = $this->getOneByField('id', $userID);

            unset($params['password'], $params['type']);
            $params['user_id'] = $userID;
            $params['email'] = $user->email;

            DB::table(User::TYPE_TABLES[$userType])
                ->insert($params);


            DB::commit();

            return $user;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function createNewPassword(int $userID, string $password): bool
    {
        return User::where('id', $userID)
            ->update(['password' => Hash::make($password)]);
    }
}
