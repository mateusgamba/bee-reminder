<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public const USERS = [['email' => 'dev@gfakemail.com']];

    /**
     * @return void
     */
    public function run()
    {
        foreach (self::USERS as $user) {
            User::firstOrCreate($user);
        }
    }
}
