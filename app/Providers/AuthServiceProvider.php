<?php
namespace App\Providers;

use App\Models\Vocabulary;
use App\Policies\VocabularyPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Vocabulary::class => VocabularyPolicy::class,  // Link the model and the policy
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        // You can add additional service registrations here, but it's not needed for policies
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies(); // Registers the policies mapped in the $policies property
    }
}
