<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Type; 
class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Type::insert([
            ['name' => 'Noun', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Verb', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Adjective', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Kanji', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Hiragana', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Katakana', 'created_at' => now(), 'updated_at' => now()],


        ]);
    }
}
