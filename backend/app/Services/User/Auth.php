<?php

namespace App\Services\User;

use App\DTO\User\RegistrationUserDTO;
use App\Exceptions\AuthException;
use App\Exceptions\InvalidTokenException;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ResetPasswordEmailValidationRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Jobs\UserPhotoSaverJob;
use App\Mail\EmailVerificationMail;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use App\Repositories\Contracts\User\IAuthRepo;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\PersonalAccessToken;

class Auth implements \App\Services\Contracts\User\IAuth
{

    private IAuthRepo $authRepo;

    public function __construct(IAuthRepo $repo)
    {
        $this->authRepo = $repo;
    }

    public function registerWithEmail(string $email): bool
    {
        $user = $this->authRepo->createEmptyUserWithEmail($email);
        //send to queues
        dispatch(function () use ($email, $user) {
            Mail::to($email)->send(new EmailVerificationMail(
                $url = config('app.url') . '/auth/register?registerToken=' . $user->createToken('email_verification')->plainTextToken
            ));
        })->afterResponse();

        return $user->wasRecentlyCreated;
    }

    public function registrationConcreteUser(RegistrationUserDTO $registrationUserDTO, PersonalAccessToken $token, ?UploadedFile $photo = null): array
    {
        $imgURL = null;
        if ($photo != null){
            $imgURL = \Img::uploadToS3($photo);
        }
        $user = $this->authRepo->createSpecialUserAndSetPassword($registrationUserDTO, $imgURL);
        $token->delete();

        return [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(time())->toDateTimeString(),
        ];
    }

    /**
     * @throws AuthorizationException
     */
    public function login(string $email, string $password): array
    {
        if (!\Illuminate\Support\Facades\Auth::attempt(['email' => $email, 'password' => $password])) {
            throw new AuthException("Invalid password or email");
        }

        $user = $this->authRepo->oneByField('email', $email);

        return [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(time())->toDateTimeString(),
        ];
    }

    public function logout(string $bearerToken): bool
    {
        $token = PersonalAccessToken::findToken($bearerToken);
        if (is_null($token)) {
            throw new AuthException();
        }

        return $token->delete();
    }

    public function validateRegistrationToken(string $token): string
    {
        return $this->authRepo->setValidatedEmail($token);
    }

    public function validateResetPasswordToken(string $token): bool
    {
        $personalToken = PersonalAccessToken::findToken($token);
        if (is_null($personalToken)) {
            throw new InvalidTokenException();
        }

        return true;
    }

    public function sendResetPasswordToEmail(string $email): bool
    {
        $user = User::where('email', $email)->first();

        //add to queue and send email
        dispatch(function () use ($email, $user) {
            Mail::to($email)->send(new ResetPasswordMail(
                $url = config('app.url') . '/auth/recovery/?resetToken=' . $user->createToken('reset_password')->plainTextToken
            ));
        })->afterResponse();

        return true;
    }

    public function resetPassword(int $userID, PersonalAccessToken $token, string $password): array
    {
        $this->authRepo->createNewPassword($userID, Hash::make($password));

        $response = [
            'token' => $token->tokenable->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(time())->toDateTimeString(),
        ];

        $token->delete();

        return $response;
    }

    /**
     * @param $token
     * @return PersonalAccessToken
     */
    private function validatePersonalAccessTokenAndSetUser($token): PersonalAccessToken
    {
        $personalToken = PersonalAccessToken::findToken($token);
        if (is_null($personalToken)) {
            throw new InvalidTokenException();
        }

        \Auth::setUser($personalToken->tokenable);

        return $personalToken;
    }
}
