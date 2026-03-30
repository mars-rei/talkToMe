<?php

# last updated on 30/03 by mars

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title', 
    ];

    // a journal belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}