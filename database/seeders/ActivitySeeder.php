<?php

namespace Database\Seeders;
use App\Models\User;
use App\Models\Category;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::first(); 

        $categories = Category::all();

        DB::table('activities')->insert([
            [
                'activity_name' => 'Japanese Speaking',
                'description' => 'Practiced conversational Japanese.',
                'date' => '2024-11-01',
                'duration' => 60,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Speaking')->first()->id,
            ],
            [
                'activity_name' => 'Vocabulary Building',
                'description' => 'Learned 20 new vocabulary words in Japanese.',
                'date' => '2024-11-03',
                'duration' => 30,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Vocabulary')->first()->id,
            ],
            [
                'activity_name' => 'Grammar Exercises',
                'description' => 'Completed grammar practice for Japanese.',
                'date' => '2024-11-05',
                'duration' => 45,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Grammar')->first()->id,
            ],
            [
                'activity_name' => 'Listening Practice',
                'description' => 'Listened to a Japanese podcast.',
                'date' => '2024-11-07',
                'duration' => 50,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Listening')->first()->id,
            ],
            [
                'activity_name' => 'Reading Practice',
                'description' => 'Read a short story in Japanese.',
                'date' => '2024-11-09',
                'duration' => 40,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Pronunciation')->first()->id,

            ],
            [
                'activity_name' => 'Writing Practice',
                'description' => 'Wrote a journal entry in Japanese.',
                'date' => '2024-11-11',
                'duration' => 35,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Writing')->first()->id,

            ],
            [
                'activity_name' => 'Pronunciation Drills',
                'description' => 'Practiced Japanese pronunciation.',
                'date' => '2024-11-13',
                'duration' => 25,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Pronunciation')->first()->id,

            ],
            [
                'activity_name' => 'Japanese Writing',
                'description' => 'Wrote a story in Japanese.',
                'date' => '2024-11-15',
                'duration' => 40,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Writing')->first()->id,

            ],
            [
                'activity_name' => 'Listening Exercise',
                'description' => 'Watched a movie in Japanese without subtitles.',
                'date' => '2024-11-17',
                'duration' => 90,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Listening')->first()->id,

            ],
            [
                'activity_name' => 'Vocab Practice',
                'description' => 'Reviewed for Japanese vocabulary.',
                'date' => '2024-11-19',
                'duration' => 20,
                'created_at' => now(),
                'updated_at' => now(),
                'user_id' => $user->id,
                'category_id' => $categories->where('name', 'Vocabulary')->first()->id,

            ],
        ]);
    }
}
