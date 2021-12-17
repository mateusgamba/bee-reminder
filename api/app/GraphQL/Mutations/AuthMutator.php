<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Exceptions\CustomException;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Laravel\Passport\Client as OClient;
use Laravel\Passport\RefreshToken;

class AuthMutator
{
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

        return $this->oAuthRequest('password', $request);
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

        return $this->oAuthRequest('refresh_token', $data);
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

    /**
     * @return CustomException
     */
    public function unauthorized(): CustomException
    {
        throw new CustomException('The refresh token is invalid.');
    }

    /**
     * @param string $grantType
     * @param array $data
     * @return array
     */
    private function oAuthRequest(string $grantType, array $data): array
    {
        $oClient = OClient::where('password_client', true)->first();

        $dataClient = [
            'grant_type' => $grantType,
            'client_id' => $oClient->id,
            'client_secret' => $oClient->secret,
        ];

        $parameters = array_merge($dataClient, $data);

        $response = Http::post(env('PASSPORT_LOGIN_ENDPOINT'), $parameters);


        if ($response->status() === 200) {
            $responseDecoded = json_decode((string) $response->getBody(), true);

            $tokenParts = explode('.', $responseDecoded['access_token']);
            $payload = json_decode((string) base64_decode($tokenParts[1]), true);

            $refreshTokenData = RefreshToken::where('access_token_id', $payload['jti'])
                ->first()
                ->toArray();

            $currentDatetime = Carbon::now();
            $refreshTokenExpiresAt = Carbon::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s', strtotime($refreshTokenData['expires_at'])));
            $refreshTokenExpiresAtSeconds = $refreshTokenExpiresAt->diffInSeconds($currentDatetime); 
            
            $responseDecoded['refresh_token_expires_in'] = $refreshTokenExpiresAtSeconds;
            
            return $responseDecoded;
        }

        return $this->unauthorized();
    }
}
