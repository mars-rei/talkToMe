<?php

# last updated on 31/03 by mars

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Development extends Model
{
    protected $fillable = [
        'user_id',
        'date',
        'text_content', 
    ];

    // a development belongs to a user
    public function entries()
    {
        return $this->belongsTo(User::class);
    }
}