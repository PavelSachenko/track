<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\Agent;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultAgentID = DB::table('users')->insertGetId([
            'email' => 'agent@gmail.com',
            'type' => 1,
            'password' => Hash::make('qwerty'),
            'email_verified_at' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s')
        ]);

        $defaultAgencyID = DB::table('users')->insertGetId([
            'email' => 'agency@gmail.com',
            'type' => 2,
            'password' => Hash::make('qwerty'),
            'email_verified_at' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s')
        ]);

        Agent::factory()->state(['user_id' => $defaultAgentID, 'email' => 'agent@gmail.com'])->create();
        Agency::factory()->state(['user_id' => $defaultAgencyID, 'email' => 'agency@gmail.com'])->create();

        User::factory()->count(300)->create();
    }
}
