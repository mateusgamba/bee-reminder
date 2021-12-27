<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public const USERS = [
        [
            'name' => 'dev',
            'email' => 'dev@gfakemail.com',
        ],
    ];

    /**
     * @return void
     */
    public function run()
    {
        foreach (self::USERS as $user) {
            User::factory(1)->create($user);
        }
    }
}
