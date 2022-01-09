<?php

namespace App\Services\Traits;

use App\GraphQL\Exceptions\UnauthenticatedException;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Laravel\Passport\Client as OClient;
use Laravel\Passport\RefreshToken;

trait AuthClient
{
    /**
     * @param string $grantType
     * @param array $data
     * @return array
     */
    protected function requestOAuth(string $grantType, array $data): array
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

        return $this->unauthorized(
            $grantType === 'refresh_token'
                ? 'The refresh token is invalid.'
                : 'That email or password does not look right. Please try again.'
        );
    }

    /**
     * @param string $message
     * @return UnauthenticatedException
     */
    public function unauthorized(string $message): UnauthenticatedException
    {
        throw new UnauthenticatedException($message);
    }
}