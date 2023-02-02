<?php

namespace App\Services\User;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Repositories\Contracts\User\AuthRepo;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Model;

class Auth implements \App\Services\Contracts\User\Auth
{

    private AuthRepo $authRepo;

    public function __construct(AuthRepo $repo)
    {
        $this->authRepo = $repo;
    }

    public function register(RegisterRequest $request): array
    {
        $user = $this->authRepo->createUser($request->email, $request->password);

        return [
            'access_token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
        ];
    }

    /**
     * @throws AuthorizationException
     */
    public function login(LoginRequest $request): array
    {
        if (!\Illuminate\Support\Facades\Auth::attempt($request->only('email', 'password'))) {
            throw new AuthorizationException;
        }

        $user = $this->authRepo->getOne($request['email']);

        return [
            'access_token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
        ];
    }

    public function logout()
    {
        // TODO: Implement logout() method.
    }
}
