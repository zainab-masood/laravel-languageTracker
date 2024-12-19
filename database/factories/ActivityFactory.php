<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    protected $model = \App\Models\Activity::class;

    public function definition()
    {
        return [
     
                'activity_name' => $this->faker->word, 
                'category_id' => Category::factory(),
            'description' => $this->faker->paragraph,
            'date' => $this->faker->date,
            'duration' => $this->faker->numberBetween(10, 120),
            'category_id' => Category::factory(), 
            'user_id' => User::factory(), 
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
