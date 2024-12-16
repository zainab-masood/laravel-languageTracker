
<link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Language Learning Tracker</title>
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
</head>
<body>
    <header>
        <h1>Language Learning Tracker</h1>
        <nav>
        <a href="{{ route('activities.index') }}" style="color: white;">Home</a>
          <a href="{{ route('activities.create') }}" style="color: white;">Add Activity</a>

        </nav>
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        <p>&copy; 2024 Language Learning Tracker</p>
    </footer>
</body>
</html>
