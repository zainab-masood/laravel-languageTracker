<?php
namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use App\Models\Type;
use Illuminate\Database\Seeder;
use App\Models\User;

class VocabularySeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        if (!$user) {
            $this->command->error('No user found. Please create a user before running this seeder.');
            return;
        }

        $types = Type::pluck('id', 'name');

        if ($types->isEmpty()) {
            $this->command->error('No types found. Please seed the types table first.');
            return;
        }

        DB::table('vocabulary')->insert([
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
