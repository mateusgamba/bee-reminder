<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Services\Traits\AuthClient;

class UserService extends AbstractService
{
    use AuthClient;

    /**
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param array $data
     * @return array
     */
    public function create(array $data): array
    {
        $this->repository->create($data);
        return $this->requestOAuth(
            'password',
            [
                'username' => $data['email'],
                'password' => $data['password'],
            ]
        );
    }
}
