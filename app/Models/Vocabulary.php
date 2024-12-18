<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vocabulary extends Model
{
    use HasFactory;
    protected $table = 'vocabulary';
    protected $fillable = ['word', 'meaning', 'type_id', 'status', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function type()
    {
        return $this->belongsTo(Type::class);
    }
   
}
