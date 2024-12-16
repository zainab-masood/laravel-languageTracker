<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;




class VocabularySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first(); 

        DB::table('vocabulary')->insert([
            // Kanji
            [
                'word' => '山',
                'meaning' => 'mountain',
                'category' => 'Kanji',
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '川',
                'meaning' => 'river',
                'category' => 'Kanji',
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Verbs
            [
                'word' => '食べる',
                'meaning' => 'to eat',
                'category' => 'Verb',
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '飲む',
                'meaning' => 'to drink',
                'category' => 'Verb',
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Nouns
            [
                'word' => '猫',
                'meaning' => 'cat',
                'category' => 'Noun',
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '犬',
                'meaning' => 'dog',
                'category' => 'Noun',
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Adjectives
            [
                'word' => '大きい',
                'meaning' => 'big',
                'category' => 'Adjective',
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '小さい',
                'meaning' => 'small',
                'category' => 'Adjective',
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Additional Words
            [
                'word' => 'おはよう',
                'meaning' => 'Good morning',
                'category' => 'Expression',
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => 'ありがとう',
                'meaning' => 'Thank you',
                'category' => 'Expression',
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '日本',
                'meaning' => 'Japan',
                'category' => 'Noun',
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '友達',
                'meaning' => 'friend',
                'category' => 'Noun',
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
