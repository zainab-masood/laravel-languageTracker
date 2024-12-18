<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Vocabulary;
use App\Models\Type;  // Correctly use Type model

class VocabularyController extends Controller
{
    // Display the list of vocabulary words
    public function index()
    {
        $vocabulary = Vocabulary::with('type') // Eager-load the 'type' relationship
            ->where('user_id', auth()->id())
            ->paginate(5); // Adjust pagination as needed
    
        return Inertia::render('Vocabulary/Index', [
            'vocabulary' => $vocabulary,
        ]);
    }

    // Show the form to create a new vocabulary word
    public function create()
    {
        $types = Type::all(); // Fetch all vocabulary types (Kanji, Verb, etc.)
    
        return Inertia::render('Vocabulary/Create', [
            'types' => $types,
        ]);
    }
    
    // Show a single vocabulary word
    public function show($id)
    {
        $vocabulary = Vocabulary::findOrFail($id);
        return view('vocabulary.show', compact('vocabulary'));
    }
    
    // Store a new vocabulary word in the database
    public function store(Request $request)
    {
        // Validate the form data
        $validated = $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string',
            'type_id' => 'required|exists:types,id', // Ensure the type exists
            'status' => 'required|in:Learning,Mastered',
        ]);

        // Create the new vocabulary entry
        Vocabulary::create([
            'word' => $validated['word'],
            'meaning' => $validated['meaning'],
            'type_id' => $validated['type_id'],
            'status' => $validated['status'],
            'user_id' => auth()->id(), // Associate vocabulary with the authenticated user
        ]);

        // Redirect back to the vocabulary index with a success message
        return redirect()->route('vocabulary.index')->with('success', 'Vocabulary added successfully!');
    }

    // Show the form to edit an existing vocabulary word
    public function edit(Vocabulary $vocabulary)
    {
        $this->authorize('update', $vocabulary); // Ensure only the owner can edit
        return inertia('Vocabulary/Edit', ['vocabulary' => $vocabulary]);
    }

    // Update an existing vocabulary word
    public function update(Request $request, Vocabulary $vocabulary)
    {
        $this->authorize('update', $vocabulary);

        // Validate the updated data
        $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string|max:255',
            'category' => 'required|string',
            'status' => 'in:Learning,Mastered',
        ]);

        // Update the vocabulary word
        $vocabulary->update($request->all());

        // Redirect back to the vocabulary index with a success message
        return redirect()->route('vocabulary.index')->with('success', 'Word updated successfully!');
    }

    // Delete an existing vocabulary word
    public function destroy(Vocabulary $vocabulary)
    {
        $this->authorize('delete', $vocabulary); // Ensure only authorized user can delete
        $vocabulary->delete();

        // Redirect back to the vocabulary index with a success message
        return redirect()->route('vocabulary.index')->with('success', 'Word deleted successfully!');
    }
}
