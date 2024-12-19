<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        
        User::factory()->create([
            'name' => 'Samia',
            'email' => 'SamiaAdeel@example.com',
            'password' => bcrypt('password123'),
        ]);

        $this->call([
            CategorySeeder::class,
            ActivitySeeder::class,
            TypeSeeder::class,
            VocabularySeeder::class,
            DailyLogSeeder::class,



        ]);
    }
}
