<?php

namespace App\Services;

use App\Services\Traits\AuthClient;

class AuthService
{
    use AuthClient;

    public function login(array $data): array
    {
        return $this->request('password', $data);
    }
}
