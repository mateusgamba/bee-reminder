<?php

namespace App\Jobs;

use App\Jobs;
use App\Mail\ReminderMail;
use Illuminate\Support\Facades\Mail;

class ReminderMailJob extends Job
{
    /**
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * @return void
     */
    public function handle()
    {
        $details = [
            'title' => 'Your reminders for today',
            'body' => 'Content',
        ];
        Mail::to('mateusgamba@gmail.com')->send(new ReminderMail($details));
    }
}
