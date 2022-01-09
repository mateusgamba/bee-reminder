<?php

namespace App\GraphQL\Mutations;

use App\Services\AuthService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class AuthMutator
{
    /**
     * @var AuthService
     */
    protected $service;

    /**
     * @param AuthService $service
     */
    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }

    /**
     * @param null $root
     * @param array $request
     * @return array
     */
    public function login(?string $root, array $request): array
    {
        $request = Arr::except($request, 'directive');
        $request['username'] = $request['email'];
        unset($request['email']);

        return $this->service->login($request);
    }

    /**
     * @param null $root
     * @param array $request
     * @return array
     */
    public function refreshToken(?string $root, array $request): array
    {
        $refreshToken = $request['refresh_token'];

        $data = ['refresh_token' => $refreshToken];

        return $this->service->oAuthRequest('refresh_token', $data);
    }

    /**
     * @param null $root
     * @param array $request
     * @return array
     */
    public function logout(): array
    {
        $user = Auth::user();
        $tokenId = $user->token()->id;

        $tokenRepository = app('Laravel\Passport\TokenRepository');
        $refreshTokenRepository = app(
            'Laravel\Passport\RefreshTokenRepository'
        );

        $tokenRepository->revokeAccessToken($tokenId);
        $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($tokenId);

        return ['message' => __('messages.logout')];
    }
}
