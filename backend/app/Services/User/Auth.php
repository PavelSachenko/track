<?php

namespace App\Services\User;

use App\Exceptions\AuthException;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Mail\EmailVerificationMail;
use App\Repositories\Contracts\User\AuthRepo;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Model;
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

    public function registerWithEmail(RegisterRequest $request): bool
    {
        $user = $this->authRepo->createUser($request->email);

        Mail::to($request->email)->send(new EmailVerificationMail(
            $url = route('email.validate-token') . '?token=' . $user->createToken('email_verification')->plainTextToken
        ));

        return $user->wasRecentlyCreated;
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
            'access_token' => $user->createToken('email_verification')->plainTextToken,
            'token_type' => 'Bearer',
        ];
    }

    public function logout(Request $request): bool
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        if (is_null($token)){
            throw new AuthException();

        }
        return $token->delete();
    }

    public function validateToken(ValidateEmailTokenRequest $request): string
    {
        $user = $this->authRepo->getOneByField('id',PersonalAccessToken::findToken($request->token)->tokenable_id);

        return $user->email;
    }

}
