<?php

namespace App\Http\Controllers;
use App\Models\Quiz;
use App\Models\Vocabulary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function create()
    {
        $vocabulary = Vocabulary::inRandomOrder()->take(5)->get(); 
               return Inertia::render('Quiz/Create', ['vocabulary' => $vocabulary]);
    }

    public function store(Request $request)
    {
        $quiz = Quiz::create(['user_id' => auth()->id()]);
        $score = 0;

        foreach ($request->questions as $question) {
            $isCorrect = $question['user_answer'] === $question['correct_answer'];
            $score += $isCorrect ? 1 : 0;

            $quiz->questions()->create([
                'question' => $question['question'],
                'correct_answer' => $question['correct_answer'],
                'user_answer' => $question['user_answer'],
                'is_correct' => $isCorrect,
            ]);
        }

        $quiz->update(['score' => $score]);

        return redirect()->route('quiz.results', $quiz->id);
    }

    public function results(Quiz $quiz)
    {
        return Inertia::render('Quiz/Results', ['quiz' => $quiz->load('questions')]);
    }}
