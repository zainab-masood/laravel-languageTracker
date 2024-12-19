<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vocabulary>
 */
class VocabularyFactory extends Factory
{
    protected $model = \App\Models\Vocabulary::class;

    public function definition()
    {
        return [
            'word' => $this->faker->word,
            'meaning' => $this->faker->sentence(5),
            'status' => $this->faker->randomElement(['Learning', 'Mastered']),
            'type_id' => null, 
            'user_id' => User::factory(), 
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
