<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Type; // Import the Type model

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert fixed type records
        Type::insert([
            ['name' => 'Noun', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Verb', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Adjective', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Kanji', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
