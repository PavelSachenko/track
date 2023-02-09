<?php

namespace App\Services\User;

use App\Exceptions\AuthException;
use App\Exceptions\InvalidTokenException;
use App\Http\Requests\Auth\EmailRegistrationRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ResetPasswordEmailValidationRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Mail\EmailVerificationMail;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use App\Repositories\Contracts\User\AuthRepo;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\PersonalAccessToken;

class Auth implements \App\Services\Contracts\User\Auth
{

    private AuthRepo $authRepo;

    public function __construct(AuthRepo $repo)
    {
        $this->authRepo = $repo;
    }

    public function registerWithEmail(EmailRegistrationRequest $request): bool
    {
        $user = $this->authRepo->createEmptyUserWithEmail($request->email);
        $email = $request->email;
        //send to queues
        dispatch(function () use ($email, $user) {
            Mail::to($email)->send(new EmailVerificationMail(
                $url = env('app.url') . '/auth/register?registerToken=' . $user->createToken('email_verification')->plainTextToken
            ));
        })->afterResponse();

        return $user->wasRecentlyCreated;
    }

    public function registrationConcreteUser(RegistrationRequest $registrationRequest): array
    {
        $personalToken = PersonalAccessToken::findToken($registrationRequest->token);
        if (is_null($personalToken)) {
            throw new InvalidTokenException();
        }
        \Auth::setUser($personalToken->tokenable);

        $user = $this->authRepo->createSpecialUserAndSetPassword(
            $personalToken->tokenable_id,
            $registrationRequest->type,
            array_merge(
                ['img' => \Img::uploadToS3($registrationRequest->file('img'))],
                $registrationRequest->except(['password_confirmation', 'token', 'img']
                ))
        );

        $personalToken->delete();

        return [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(time())->toDateTimeString(),
        ];
    }

    /**
     * @throws AuthorizationException
     */
    public function login(LoginRequest $request): array
    {
        if (!\Illuminate\Support\Facades\Auth::attempt($request->only('email', 'password'))) {
            throw new AuthException("Invalid password or email");
        }

        $user = $this->authRepo->getOneByField('email', $request['email']);

        return [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(time())->toDateTimeString(),
        ];
    }

    public function logout(Request $request): bool
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        if (is_null($token)) {
            throw new AuthException();

        }
        return $token->delete();
    }

    public function validateRegistrationToken(ValidateEmailTokenRequest $request): string
    {
        return $this->authRepo->setValidatedEmail($request->token);
    }

    public function validateResetPasswordToken(ValidateEmailTokenRequest $request): bool
    {
        $personalToken = PersonalAccessToken::findToken($request->token);
        if (is_null($personalToken)) {
            throw new InvalidTokenException();
        }

        return true;
    }

    public function sendResetPasswordToEmail(ResetPasswordEmailValidationRequest $request): bool
    {
        $user = User::where('email', $request->email)->first();
        $email = $request->email;

        //add to queue and send email
        dispatch(function () use ($email, $user) {
            Mail::to($email)->send(new ResetPasswordMail(
                $url = env('app.url') . '/auth/recovery/?resetToken=' . $user->createToken('reset_password')->plainTextToken
            ));
        })->afterResponse();

        return true;
    }

    public function resetPassword(ResetPasswordRequest $request): array
    {
        $personalToken = PersonalAccessToken::findToken($request->token);
        if (is_null($personalToken)) {
            throw new InvalidTokenException();
        }

        \Auth::setUser($personalToken->tokenable);

        return [
            'token' => \Auth::user()->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(time())->toDateTimeString(),
        ];
    }
}
