<?php

namespace App\GraphQL\Mutations;

use App\Models\Reminder;
use App\Services\ReminderService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

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
        $reminder = Arr::except($request, 'directive');
        $reminder['user_id'] = Auth::user()->id;
        return $this->service->create($reminder);
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
