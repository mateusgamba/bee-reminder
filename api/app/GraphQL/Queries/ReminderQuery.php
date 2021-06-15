<?php

namespace App\GraphQL\Queries;

use App\Models\Reminder;
use App\Services\ReminderService;
use Illuminate\Database\Eloquent\Builder;

class ReminderQuery
{
    /**
     * @var ReminderService
     */
    protected $service;

    /**
     * @param ReminderService $service
     */
    public function __construct(ReminderService $service)
    {
        $this->service = $service;
    }

    /**
     * @param null $root
     * @param array $request
     * @return Builder
     */
    public function all(?string $root, array $request): Builder
    {
        return $this->service->all($request['filter'] ?? []);
    }
}
