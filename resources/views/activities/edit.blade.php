
<link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
@extends('activities.app')

@section('content')
    <h2>Edit Activity</h2>

    <form action="{{ route('activities.update', $activity->id) }}" method="POST">
        @csrf
        @method('PUT')

        <label for="activity_name">Activity Name:</label>
        <input type="text"  name="activity_name" value="{{ $activity->activity_name }}" required>

        <label for="description">Description:</label>
        <textarea  name="description">{{ $activity->description }}</textarea>

        <label for="date">Date:</label>
        <input type="date" name="date" value="{{ $activity->date }}" required>

        <label for="duration">Duration (minutes):</label>
        <input type="number" name="duration" value="{{ $activity->duration }}" required>

        <button type="submit">Update Activity</button>
    </form>
@endsection
