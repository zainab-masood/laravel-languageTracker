<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use App\Models\Type;
use Illuminate\Database\Seeder;
use App\Models\User;

class VocabularySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first(); // Assuming a user exists
        if (!$user) {
            $this->command->error('No user found. Please create a user before running this seeder.');
            return;
        }

        // Retrieve all types as a map with type name as the key
        $types = Type::pluck('id', 'name'); // ['Kanji' => 1, 'Verb' => 2, ...]

        // Check if the necessary types exist
        if ($types->isEmpty()) {
            $this->command->error('No types found. Please seed the types table first.');
            return;
        }

        DB::table('vocabulary')->insert([
            // Kanji
            [
                'word' => '山',
                'meaning' => 'mountain',
                'type_id' => $types['Kanji'] ?? null,
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '川',
                'meaning' => 'river',
                'type_id' => $types['Kanji'] ?? null,
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Verbs
            [
                'word' => '食べる',
                'meaning' => 'to eat',
                'type_id' => $types['Verb'] ?? null,
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '飲む',
                'meaning' => 'to drink',
                'type_id' => $types['Verb'] ?? null,
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Nouns
            [
                'word' => '猫',
                'meaning' => 'cat',
                'type_id' => $types['Noun'] ?? null,
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '犬',
                'meaning' => 'dog',
                'type_id' => $types['Noun'] ?? null,
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Adjectives
            [
                'word' => '大きい',
                'meaning' => 'big',
                'type_id' => $types['Adjective'] ?? null,
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '小さい',
                'meaning' => 'small',
                'type_id' => $types['Adjective'] ?? null,
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Additional Nouns
            [
                'word' => '日本',
                'meaning' => 'Japan',
                'type_id' => $types['Noun'] ?? null,
                'status' => 'Learning',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'word' => '友達',
                'meaning' => 'friend',
                'type_id' => $types['Noun'] ?? null,
                'status' => 'Mastered',
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
