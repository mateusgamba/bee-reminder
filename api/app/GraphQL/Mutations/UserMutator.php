<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Arr; 

class UserMutator
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
    public function create(?string $root, array $request): array
    {
        $request = Arr::except($request, ['directive', 'passwordConfirmation']);
        return $this->service->create($request);
    }
}
