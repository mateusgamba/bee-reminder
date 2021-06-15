<?php

namespace App\GraphQL\Mutations;

use App\Models\Reminder;
use App\Services\ReminderService;
use Illuminate\Support\Arr;

class ReminderMutator
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
     * @return Reminder
     */
    public function create(?string $root, array $request): Reminder
    {
        $request = Arr::except($request, 'directive');
        return $this->service->create($request);
    }

    /**
     * @param null $root
     * @param array $request
     * @return array
     */
    public function delete(?string $root, array $request): array
    {
        $this->service->destroy($request['id']);
        return ['message' => 'Successfully deleted.'];
    }
}
