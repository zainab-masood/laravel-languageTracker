<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\Category;
use App\Models\DailyLog;
use App\Models\Vocabulary;



class ActController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $activities = Activity::where('user_id', auth()->id())->with('category')->Paginate(5);

        return Inertia::render('Activities/index', [
            'activities' => $activities,
        ]);
        }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();  
        return Inertia::render('Activities/Create', [
            'categories' => $categories,  
        ]);    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'activity_name' => 'required|string|max:255',
            'date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',

        ]);

        Activity::create([
            'activity_name' => $request->activity_name,
            'description' => $request->description,
            'date' => $request->date,
            'duration' => $request->duration,
            'category_id' => $request->category_id,
            'user_id' => auth()->id(),  
            
        ]);        return redirect()->route('dashboard')->with('success', 'Activity added!');  

      }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        return view('activities.show', compact('activity'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Activity $activity)
    {
        $categories = Category::all();
        return Inertia::render('Activities/edit', [
            'activity' => $activity,
            'categories' => $categories,
        ]);    }

   
    public function search(Request $request)
    {
        $query = $request->input('query');
        $activities = Activity::where('activity_name', 'LIKE', "%{$query}%")->paginate(5);
        return view('dashboard', compact('activities'));
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Activity $activity)
    {
        $request->validate([
            'activity_name' => 'required|string|max:255',
            'date' => 'required|date',
            'duration' => 'required|integer|min:1'
        ]);

        $activity->update($request->all());
        return redirect()->route('dashboard')->with('success', 'Activity updated!');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        $activity->delete();
        return redirect()->route('dashboard')->with('success', 'Activity deleted!');
    }

    public function dashboard(Request $request)
{
    $query = $request->input('query'); // Get the search query from the request

    $activities = Activity::where('user_id', auth()->id())
        ->when($query, function ($q) use ($query) {
            $q->where('activity_name', 'LIKE', "%{$query}%") // Search in activity name
              ->orWhere('description', 'LIKE', "%{$query}%"); // Search in description
        })
        ->with('category') // Include category relationship
        ->paginate(5);
        $streak = 0;
        $logs = DailyLog::where('user_id', auth()->id())
            ->orderBy('date', 'desc')
            ->get();
            $previousDate = now()->toDateString();
    foreach ($logs as $log) {
        if ($log->date == $previousDate || $log->date == now()->subDay()->toDateString()) {
            $streak++;
            $previousDate = $log->date;
        } else {
            break; // Break the streak if there are no consecutive dates
        }
    }
    $categories = Category::all(['id', 'name']);

    $masteredWords = Vocabulary::where('user_id', auth()->id())
    ->where('status', 'Mastered')
    ->count();
    $totalVocabulary = Vocabulary::where('user_id', auth()->id())->count();

    return Inertia::render('Dashboard', [
        'activities' => $activities,
        'query' => $query, 
        'streak' => $streak,
        'masteredWords' => $masteredWords,
        'categories' => $categories,

        'totalVocabulary' => $totalVocabulary,


    ]);
}



}
