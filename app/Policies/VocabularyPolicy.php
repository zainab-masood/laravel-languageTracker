<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vocabulary;
use Illuminate\Auth\Access\Response;

class VocabularyPolicy
{
    public function update(User $user, Vocabulary $vocabulary)
    {
        return $user->id === $vocabulary->user_id;
    }

    public function delete(User $user, Vocabulary $vocabulary)
    {
        return $user->id === $vocabulary->user_id;
    }
    public function view(User $user, Vocabulary $vocabulary): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    
    
    public function restore(User $user, Vocabulary $vocabulary): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Vocabulary $vocabulary): bool
    {
        return false;
    }
}
