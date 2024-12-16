<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
            Category::create(['name' => 'Speaking']);
            Category::create(['name' => 'Vocabulary']);
            Category::create(['name' => 'Grammar']);
            Category::create(['name' => 'Listening']);
            Category::create(['name' => 'Writing']);
            Category::create(['name' => 'Pronunciation']);
        } 
}
