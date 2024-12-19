





## Language Learning Tracker


Language Learning Tracker is a Laravel-based web application that lets users log and manage their language learning activities, like practicing, speaking, and listening exercises they did. This project illustrates key concepts in web development with the use of MVC architecture, Laravel components (controllers, models, views), CRUD operations, database migration, and basic pagination.


## Features

- It uses an *activities* table in MySQL, in First Normal Form (1NF), with columns to describe the activity, name, date, and duration.
- Migration `database/migrations` define the table structure, and Seeder `database/seeders/ActivitySeeder.php` populates the table for a simple setup.
- The app has **Create, Read, Update**, and **Delete** operations within ActController.php to manages data flow. Users can log new activities through a form and edit or delete activities from the list. All activities are displayed on the main page in a paginated list.
- This is the store method, with Laravel *validation* to prevent invalid data entry:
```
public function store(Request $request)
    {
        $request->validate([
            'activity_name' => 'required|string|max:255',
            'date' => 'required|date',
            'duration' => 'required|integer|min:1'
        ]);

        Activity::create($request->all());
        return redirect()->route('activities.index')->with('success', 'Activity added!');    }

```
- Required fields and specific formats for date and duration ensure that the application handles data responsibly.
- Good Practice for secure handling of user input with Laravel’s validation and mass assignment protection. The *fillable property* in `Activity.php` explicitly defines mass-assignable fields to avoid unintentional data manipulation.
```
protected $fillable = [
        'activity_name',
        'description',
        'date',
        'duration',
        
    ];
```
- Routes are defined in `web.php` for controller actions making it a scalable structure.
- The model uses Eloquent for efficient database interaction, simplifying SQL operations into readable PHP methods.
- The app uses custom CSS `public/assets/css/app.css` for basic styling and color contrast with form layout for a user-friendly interface. No external libraries are used as stated in the assignment guidelines.
- A search bar on the main page filters activities by keywords with Eloquent’s query builder in search():
```
public function search(Request $request)
    {
        $query = $request->input('query');
        $activities = Activity::where('activity_name', 'LIKE', "%{$query}%")->paginate(10);
        return view('activities.index', compact('activities'));
    }
```
- **Pagination** is used for records across pages to minimize clutter. The *Paginate()* method is used for "Previous" and "Next" links only, making navigation simple and straightforward. This is helpful when there are many records and keeps the interface clean.
- Consistent views are rendered with reusable Blade templates. `activities/app.blade.php` helps with consistent navigation and styling across all pages as each view extends this layout.

```
 <h1>Language Learning Tracker</h1>
        <nav>
        <a href="{{ route('activities.index') }}" style="color: white;">Home</a>
          <a href="{{ route('activities.create') }}" style="color: white;">Add Activity</a>

        </nav>
```

## Installation


- Download the project or clone the repository.
```
git clone https://repo-link

```
- Install Dependencies
```
composer install

```
- Update the .env file database credentials
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database
DB_USERNAME=username
DB_PASSWORD=password
```
- Run Migrations and Seeders:
```
php artisan migrate --seed

php artisan db:seed --class=ActivitySeeder


```
- Start the server and access the app at the generated link (http://127.0.0.1:8000)
```
php artisan serve

```
