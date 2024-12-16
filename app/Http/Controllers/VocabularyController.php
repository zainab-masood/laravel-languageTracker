<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;
use App\Models\Vocabulary;
use App\Models\Category;



class VocabularyController extends Controller
{
    public function index()
    {
        $vocabulary = Vocabulary::where('user_id', auth()->id())->paginate(5);
        return inertia('Vocabulary/Index', ['vocabulary' => $vocabulary]);
    }

    public function create()
    {
        $categories = Category::all();  // Get all categories for the dropdown
        return Inertia::render('Vocabulary/Create', [
            'categories' => $categories,  // Pass categories to the front-end
        ]);
    }
   
    public function show($id)
    {
        $vocabulary = Vocabulary::findOrFail($id);
        return view('vocabulary.show', compact('vocabulary'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string|max:255',
            'category' => 'required|string',
            'status' => 'in:Learning,Mastered',
        ]);

        Vocabulary::create([
            'word' => $request->word,
            'meaning' => $request->meaning,
            'category' => $request->category,
            'status' => $request->status ?? 'Learning',
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('vocabulary.show')->with('success', 'Word added successfully!');
    }

    public function edit(Vocabulary $vocabulary)
    {
        $this->authorize('update', $vocabulary); // Ensure only the owner can edit
        return inertia('Vocabulary/Edit', ['vocabulary' => $vocabulary]);
    }

    public function update(Request $request, Vocabulary $vocabulary)
    {
        $this->authorize('update', $vocabulary);

        $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string|max:255',
            'category' => 'required|string',
            'status' => 'in:Learning,Mastered',
        ]);

        $vocabulary->update($request->all());

        return redirect()->route('vocabulary.index')->with('success', 'Word updated successfully!');
    }

    public function destroy(Vocabulary $vocabulary)
    {
        $this->authorize('delete', $vocabulary);
        $vocabulary->delete();

        return redirect()->route('vocabulary.index')->with('success', 'Word deleted successfully!');
    }
}
