<?php

namespace App\Repositories;

use App\Models\Reminder;
use App\Traits\Filterable;

class ReminderRepository extends AbstractRepository
{
    use Filterable;

    /**
     * @param Reminder $reminder
     */
    public function __construct(Reminder $reminder)
    {
        $this->model = $reminder;
    }
}
