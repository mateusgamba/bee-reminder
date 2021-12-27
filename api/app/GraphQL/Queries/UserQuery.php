<?php

namespace App\GraphQL\Queries;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class UserQuery
{
    /**
     * @var UserService
     */
    protected $service;

    /**
     * @param UserService $service
     */
    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    /**
     * @param null $root
     * @param array $request
     * @return User
     */
    public function me(?string $root, array $request): User
    {
        return $this->service->find(Auth::user()->id);
    }
}
