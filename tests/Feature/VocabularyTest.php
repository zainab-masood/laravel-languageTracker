<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class VocabularyTest extends TestCase
{
   
    public function test_user_can_create_vocabulary()
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->post('/vocabulary', [
                'word' => '日',
                'meaning' => 'sun',
                'type' => 'Kanji',
                'status' => 'Learning',
            ])
            ->assertRedirect('/vocabulary');
        
        $this->assertDatabaseHas('vocabulary', ['word' => '日']);
    }
    
}
