<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Events\Authenticated;
use App\Listeners\LogDailyActivity;



class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Authenticated::class => [
            LogDailyActivity::class, 
        ],
    ];


    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
