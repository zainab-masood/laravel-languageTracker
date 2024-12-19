
## Language Learning Tracker 2.0

The Language Learning Tracker is a web application with many helpful features designed to help users keep track of their progress in learning Japanese. It has activity tracking, vocabulary management, streaks, and quizzes to show how far you have come.


This project was made to show my understanding of what I have learned about advanced web application development using Laravel and React, integrating Tailwind CSS, Inertia.js, and Eloquent ORM for better performance and a user-friendly experience.


## Additional Features

- Added secure login and registration using Laravel Breeze. I used it because it solves common security issues related to login systems, including protecting against unauthorized access and it also integrates well with the React components used.
```
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ActController::class, 'dashboard'])->name('dashboard');

    // all the other routes as well
});
```

- After the successful login the user is taken to `/Dashboard` where all activities are displayed on the main page in a paginated list.

- With the `ActController.php` the app has all CRUD operations for activities and I have also added search so all activities are categorized and can be filtered by *category* (which is a dropdown) or *search terms*.
- From the navigation menu users can access the **Vocabulary** page where they can see all their saved words listed. Users can add vocabulary words with meaning, types (e.g., Verb, Kanji, katakana) and status as "*Learning*" or "*Mastered*." It is checked against the **Types** table with id as well.
```
 $validated = $request->validate([
            'word' => 'required|string|max:255',
            'meaning' => 'required|string',
            'type_id' => 'required|exists:types,id',
            'status' => 'required|in:Learning,Mastered',
        ]);


```
- The relationship between the tables is defined in the Vocabulary and Type models as 
```

public function type()
    {
        return $this->belongsTo(Type::class);
    }
   
```
and 
```
 public function vocabularies()
    {
        return $this->hasMany(Vocabulary::class);
    }
```
- Similary the One-to-Many Eloquent relationship is used for the activities and categories table to make the architecture scalable. 
- To make the app more useful there is a quiz feature accessed from the nav bar where a dynamic vocabulary quiz is generated for the user and then they can visually see their results. To make it more interactive there is a loading ***animation*** after the submit button is clicked and the user is redirected to the `/quiz/results ` page .
```
                     <div className="flex justify-center items-center mt-6">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="ml-4 text-lg text-blue-500 dark:text-blue-300">Checking answers...</p>
                    </div>
```
- To make it more motivating for users to use the web app, there is a streak feature. Every day the user logs in is saved to the database in the **daily_logs** table which is then used to calculate the streak in the backend. This is done using the `EventServiceProvider.php`:
```
class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Authenticated::class => [
            LogDailyActivity::class, 
        ],
    ];
```
- It is calculated in the backend and used in the frontend.
```
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
            break; 
        }
    }
```
- For a more visual representation of the users' activity, the dashboard displays daily streak and how much vocabulary is mastered as progress in:
```
            <div
               className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-900 dark:text-white">
                        Mastered {masteredWords} out of {totalVocabulary} words ({progressPercentage}%)
                    </p>
                </div>
```

- The models use Eloquent for efficient database interactions for all the tables (activities, categories,daily_logs, quizzes,question users, types, vocabulary).
- The navigation menu has a **dark mode** option to toggle between light and dark modes for a user-friendly experience.
```
React.useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') document.documentElement.classList.add('dark');
    }, []);

```
- The design is fully responsive and optimized for all device sizes. For the nav bar on smaller screens I have also added a *Menu Toggle* (hamburger menu) that is only visible and usable on smaller screens:
```
<nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4`}>
                        <Link href="/dashboard" className="text-white px-4 py-2">Home</Link>
                        <Link href="/activities/create" className="text-white px-4 py-2">Add Activity</Link>
                        <Link href="/vocabulary" className="text-white px-4 py-2">Vocabulary</Link>
                        <Link href="/quiz/create" className="text-white px-4 py-2">Start Quiz</Link>
                        <button onClick={toggleDarkMode} className="text-white px-4 py-2">
                            Dark Mode
                        </button>
                        <a href="#" onClick={handleLogout} className="text-white px-4 py-2">
                            Logout
                        </a>
                    </nav>

```
- I have added a custom logo and favicon as well to customize it even more :
```
<img
                            src="/images/logo.jpg"
                            alt="App Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <h1 className="text-xl font-bold">Language Learning Tracker</h1>
```



- To not have to run individual seeders, I have added the following to the DatabaseSeeder
```
 $this->call([
            CategorySeeder::class,
            ActivitySeeder::class,
            TypeSeeder::class,
            VocabularySeeder::class,
            DailyLogSeeder::class,
        ]);
```


- The reason I went with React for this project is that it offers component-based architecture and state management, allowing for the dynamic interactivity I needed with my features (like the quiz). I used Inertia.js in combination with React to improve the interaction between the back-end (Laravel) and front-end components. The main reason for this is how it simplifies the integration of React with Laravel, making it possible to build a smooth functional website. I used Tailwind to make the design responsive across different devices as Tailwind allows for better UI development with utility-first classes.
## Testing

- I used Laravel's testing functionality to test Quiz feature and if all the activity management functionality is working well along with other default tests. To create the test, I used `php artisan make:test ActivityTest --unit `
- To use in these tests, Laravel factories provide a way to quickly generate test data (such as users, categories, or activities). I used `php artisan make:factory ActivityFactory --model=Activity`

```
 public function definition()
    {
        return [
     
                'activity_name' => $this->faker->word, 
                'category_id' => Category::factory(),
            'description' => $this->faker->paragraph,
            'date' => $this->faker->date,
            'duration' => $this->faker->numberBetween(10, 120),
            'category_id' => Category::factory(), 
            'user_id' => User::factory(), 
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
```
- The ***ActivityTest*** performs the following: 
```
  ✓ store activity with valid data                                                                 
  ✓ store activity with invalid data                                                             
  ✓ destroy activity                                                                              
  ✓ index returns user activities  
```
-  The ***QuizWorkingTest*** tests if the user can submit the quiz and be redirected to the ressults page successfully: 
```
  ✓ user can submit quiz  
```
- To run all the test :
```
php artisan test

```
## Installation


- Clone the repository.
```
git clone https://repo-link
cd assignment-folder-name
 
```
- Install Dependencies
```
composer install

```
```
npm install

```
- Create the .env file by copying the .env.example file. Update the .env file database credentials

```
cp .env.example .env
```
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database
DB_USERNAME=username
DB_PASSWORD=password
```
- Run the following command to generate a new APP_KEY in the .env file.
```
php artisan key:generate
```
- Run Migrations and Seeders:
```
php artisan migrate --seed

php artisan db:seed 


```
- Build using
```
npm run dev

```
- Start the server and open the link (http://127.0.0.1:8000)
```
php artisan serve

```
