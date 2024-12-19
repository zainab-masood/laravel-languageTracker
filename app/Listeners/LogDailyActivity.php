<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Auth\Events\Authenticated;
use App\Models\DailyLog;
use Carbon\Carbon;

class LogDailyActivity
{
    public function handle(Authenticated $event)
    {
        $user = $event->user;

        $today = Carbon::today();
        $logExists = DailyLog::where('user_id', $user->id)
            ->whereDate('date', $today)
            ->exists();

        if (!$logExists) {
            DailyLog::create([
                'date' => $today->toDateString(),
                'completed_words' => 0,
                'user_id' => $user->id,
            ]);
        }
    }
}
