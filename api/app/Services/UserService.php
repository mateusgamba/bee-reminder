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
     * @return User
     */
    public function create(array $data)
    {
        $user = $this->repository->create($data);
        $auth = [
            'email' => $user['email'],
            'password' => $data['password'],
        ];
        return $this->request('password', $auth);
    }

}
