<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\ReminderRepository;

class ReminderService extends AbstractService
{
    /**
     * @param ReminderRepository $repository
     */
    public function __construct(ReminderRepository $repository)
    {
        $this->repository = $repository;
    }
}
