<?php

namespace Database\Seeders;
use App\Models\DailyLog;
use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DailyLogSeeder extends Seeder
{
    public function run()
    {
        $user = User::first(); 
        DailyLog::insert([
            ['date' => now()->toDateString(), 'completed_words' => 5, 'user_id' => $user->id, 'created_at' => now(), 'updated_at' => now()],
            ['date' => now()->subDay()->toDateString(), 'completed_words' => 3,  'user_id' => $user->id, 'created_at' => now(), 'updated_at' => now()],
            ['date' => now()->subDays(2)->toDateString(), 'completed_words' => 4,  'user_id' => $user->id,  'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
