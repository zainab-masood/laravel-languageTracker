@extends('activities.app')

@section('content')
    <h2>Activities</h2>
<form action="{{ route('activities.search') }}" method="GET" style="margin-bottom: 20px;">
        <input type="text" name="query" placeholder="Search activities..." required>
        <button type="submit">Search</button>
    </form>

    @if(request()->has('query'))
        <p>Showing {{ $activities->total() }} result(s) for "{{ request('query') }}"</p>
    @endif

    @foreach ($activities as $activity)
        <div class="activity-card">
            <h3>{{ $activity->activity_name }}</h3>
            <p>{{ $activity->description }}</p>
            <p><strong>Date:</strong> {{ $activity->date }}</p>
            <p><strong>Duration:</strong> {{ $activity->duration }} minutes</p>

            <div class="actions">
                <a href="{{ route('activities.edit', $activity->id) }}" class="button-link">Edit</a>
                <form action="{{ route('activities.destroy', $activity->id) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="button-link">Delete</button>
                </form>
            </div>
        </div>
    @endforeach

    <div class="pagination">
        {{ $activities->links() }}
    </div>
@endsection
