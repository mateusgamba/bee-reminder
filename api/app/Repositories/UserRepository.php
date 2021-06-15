<?php

namespace App\Repositories;

use App\Models\User;
use App\Traits\Filterable;

class UserRepository extends AbstractRepository
{
    use Filterable;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->model = $user;
    }
}
