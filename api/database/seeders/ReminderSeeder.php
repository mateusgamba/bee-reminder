<?php

namespace Database\Seeders;

use App\Models\Reminder;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReminderSeeder extends Seeder
{
    public const REMINDERS = [
        [
            'description' => 'Take vaccine',
            'date' => '+5 days',
        ],
        [
            'description' => 'Book a house',
            'date' => '+2 days',
        ],
        [
            'description' => 'Buy more snacks',
            'date' => '-2 days',
        ],
    ];

    /**
     * @return void
     */
    public function run()
    {
        $user = User::first();
        foreach (self::REMINDERS as $reminder) {
            $reminder['user_id'] = $user->id;
            $reminder['date'] = date('Y-m-d', strtotime($reminder['date']));
            Reminder::firstOrCreate($reminder);
        }
    }
}
