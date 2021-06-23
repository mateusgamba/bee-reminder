<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    /**
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * @return $this
     */
    public function build()
    {
        return $this->subject('Your reminders for today')->view(
            'emails.reminder'
        );
    }
}
