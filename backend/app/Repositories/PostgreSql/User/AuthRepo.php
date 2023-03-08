<?php

namespace App\Repositories\PostgreSql\User;

use App\DTO\User\RegistrationUserDTO;
use App\Enums\UserEnum;
use App\Exceptions\InvalidTokenException;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\PersonalAccessToken;

class AuthRepo implements \App\Repositories\Contracts\User\IAuthRepo
{
    public function createEmptyUserWithEmail(string $email): \Eloquent|Model
    {
        return User::create([
            'email' => $email,
        ]);
    }

    public function oneByField(string $field, $value): \Eloquent|Model
    {
        return User::where($field, $value)->firstOrFail();
    }

    public function setValidatedEmail(string $token): string
    {
        $personalToken = PersonalAccessToken::findToken($token);
        if (is_null($personalToken)) {
            throw new InvalidTokenException();
        }

        $user = $this->oneByField('id', $personalToken->tokenable_id);
        $user->email_verified_at = date("Y-m-d H:i:s");
        $user->save();


        return $user->email;
    }

    public function createSpecialUserAndSetPassword(RegistrationUserDTO $registrationUserDTO, ?string $img = null): Model|\Eloquent
    {
        DB::beginTransaction();
        try {
            DB::table('users')
                ->where('id', $registrationUserDTO->ID)
                ->update([
                    'password' => $registrationUserDTO->password,
                    'email_verified_at' => date('Y-m-d H:i:s'),
                    'type' => $registrationUserDTO->type
                ]);
            $user = $this->oneByField('id', $registrationUserDTO->ID);

            $defaultDataForInsert = [
                'name' => $registrationUserDTO->name,
                'email' => $user->email,
                'user_id' => $registrationUserDTO->ID,
                'phone' => $registrationUserDTO->phone,
                'description' => $registrationUserDTO->description,
                'img' => $img
            ];

            match($registrationUserDTO->type){
                UserEnum::AGENT => [],
                UserEnum::AGENCY => $defaultDataForInsert['url'] = $registrationUserDTO->url,
            };


            DB::table(UserEnum::TABLES_TYPE[$registrationUserDTO->type])
                ->insert($defaultDataForInsert);


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
            ->update(['password' => $password]);
    }
}
