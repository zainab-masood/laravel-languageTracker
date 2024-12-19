<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\User;
use App\Models\Vocabulary;
use App\Models\Quiz;

class QuizWorkingTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_submit_quiz()
    {
        $user = User::factory()->create();

        $vocabulary = Vocabulary::factory()->count(5)->create(); 

        $answers = $vocabulary->mapWithKeys(function ($word) {
            return [$word->id => $word->meaning]; 
        });

        $response = $this->actingAs($user)->postJson('/quiz', [
            'questions' => $vocabulary->map(function ($word) use ($answers) {
                return [
                    'question' => $word->word,
                    'correct_answer' => $word->meaning,
                    'user_answer' => $answers[$word->id],
                ];
            }),
        ]);

        $quiz = Quiz::where('user_id', $user->id)->first();
        $this->assertNotNull($quiz);
        $this->assertEquals($user->id, $quiz->user_id);
        $this->assertEquals(5, $quiz->score); 

        $this->assertCount(5, $quiz->questions);
        foreach ($quiz->questions as $question) {
            $this->assertEquals($question->is_correct, true); 
        }

        $response->assertRedirect(route('quiz.results', $quiz->id));
    }
}
