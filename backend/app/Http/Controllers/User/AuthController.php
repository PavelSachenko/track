<?php

namespace App\Http\Controllers\User;

use App\DTO\User\Factory\IUserDTOFactory;
use App\Exceptions\InvalidTokenException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\EmailRegistrationRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ValidateEmailTokenRequest;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Services\Contracts\User\IAuth;
use App\Services\User\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function __construct(
        private readonly IAuth           $auth,
        private readonly IUserDTOFactory $userDTOFactory,
    )
    {
    }

    public function emailRegistration(EmailRegistrationRequest $request): JsonResponse
    {
        return response()->json($this->auth->registerWithEmail($request->email), Response::HTTP_CREATED);
    }

    public function validateEmailToken(ValidateEmailTokenRequest $request): JsonResponse
    {
        return response()->json($this->auth->validateRegistrationToken($request->token));
    }

    public function registration(RegistrationRequest $request): JsonResponse
    {
        $personalToken = $request->getPersonalAccessToken($request->token);

        return response()
            ->json(
                $this->auth->registrationConcreteUser(
                    $this->userDTOFactory->createRegistrationUserDTO(
                        \Auth::user()->id,
                        $request->validated()
                    ),
                    $personalToken,
                    $request->file('img')
                ), Response::HTTP_CREATED
            );
    }

    public function login(LoginRequest $request): JsonResponse
    {
        return response()->json($this->auth->login($request->email, $request->password));
    }

    public function logout(Request $request): JsonResponse
    {
        return response()->json($this->auth->logout($request->bearerToken()));
    }
}
