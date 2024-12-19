<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Vocabulary;
use App\Models\Type;

class VocabularyController extends Controller
{
    public function index()
    {
        $vocabulary = Vocabulary::with('type')
            ->where('user_id', auth()->id())
            ->paginate(5);
    
        return Inertia::render('Vocabulary/Index', [
            'vocabulary' => $vocabulary,
        ]);
    }

    public function create()
    {
        $types = Type::all();
    
        return Inertia::render('Vocabulary/Create', [
            'types' => $types,
        ]);
    }
    
    public function show($id)
    {
        $vocabulary = Vocabulary::findOrFail($id);
        return view('vocabulary.show', compact('vocabulary'));
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string',
            'type_id' => 'required|exists:types,id',
            'status' => 'required|in:Learning,Mastered',
        ]);

        Vocabulary::create([
            'word' => $validated['word'],
            'meaning' => $validated['meaning'],
            'type_id' => $validated['type_id'],
            'status' => $validated['status'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('vocabulary.index')->with('success', 'Vocabulary added successfully!');
    }

    public function edit(Vocabulary $vocabulary)
    {
        $this->authorize('update', $vocabulary);
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
