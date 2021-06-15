<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService extends AbstractService
{
    /**
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }
}
