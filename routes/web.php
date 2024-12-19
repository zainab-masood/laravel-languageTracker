<?php

use App\Http\Controllers\ActController;
//use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VocabularyController;
use App\Http\Controllers\QuizController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ActController::class, 'dashboard'])->name('dashboard');
    Route::resource('vocabulary', VocabularyController::class);
    Route::get('/vocabulary/create', [VocabularyController::class, 'create'])->name('vocabulary.create');

    Route::post('/vocabulary', [VocabularyController::class, 'store'])->name('vocabulary.store'); 

     Route::resource('activities', ActController::class);

     Route::get('/quiz/create', [QuizController::class, 'create'])->name('quiz.create');
      Route::post('/quiz', [QuizController::class, 'store'])->name('quiz.store');
     Route::get('/quiz/{quiz}/results', [QuizController::class, 'results'])->name('quiz.results');
});

require __DIR__.'/auth.php';
