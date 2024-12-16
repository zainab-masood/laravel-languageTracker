
<link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
@extends('activities.app')

@section('content')
    <h2>Add New Activity</h2>

    <form action="{{ route('activities.store') }}" method="POST">
        @csrf

        <label for="activity_name">Activity Name:</label>
        <input type="text" id="activity_name" name="activity_name" required>

        <label for="description">Description:</label>
        <textarea name="description"></textarea>

        <label for="date">Date:</label>
        <input type="date" name="date" required>

        <label for="duration">Duration (minutes):</label>
        <input type="number"  name="duration" required>

        <button type="submit">Add Activity</button>
    </form>
@endsection
