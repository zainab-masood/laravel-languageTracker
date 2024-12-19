<?php
namespace Tests\Unit;

use App\Models\Activity;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActivityTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_activity_with_valid_data()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $activityData = [
            'activity_name' => 'Morning Run',
            'description' => 'Jogging in the park for 30 minutes.',
            'date' => now()->toDateString(),
            'duration' => 30,
            'category_id' => $category->id,
            'user_id' => $user->id,
        ];

        $response = $this->actingAs($user)->post(route('activities.store'), $activityData);

        $this->assertDatabaseHas('activities', [
            'activity_name' => 'Morning Run',
            'description' => 'Jogging in the park for 30 minutes.',
            'category_id' => $category->id,
            'user_id' => $user->id,
        ]);

        $response->assertRedirect(route('dashboard'));
    }

    public function test_store_activity_with_invalid_data()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $activityData = [
            'activity_name' => '',
            'description' => 'Jogging in the park.',
            'date' => now()->toDateString(),
            'duration' => 30,
            'category_id' => $category->id,
            'user_id' => $user->id,
        ];

        $response = $this->actingAs($user)->post(route('activities.store'), $activityData);

        $response->assertSessionHasErrors('activity_name');
    }

    public function test_destroy_activity()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $activity = Activity::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id
        ]);

        $response = $this->actingAs($user)->delete(route('activities.destroy', $activity->id));

        $this->assertDatabaseMissing('activities', [
            'id' => $activity->id,
        ]);

        $response->assertRedirect(route('dashboard'));
    }

    public function test_index_returns_user_activities()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        Activity::factory()->count(3)->create(['user_id' => $user->id, 'category_id' => $category->id]);

        $response = $this->actingAs($user)->get(route('activities.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->has('activities.data', 3));
    }
}
