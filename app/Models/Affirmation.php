<?php

# last updated on 02/04 by mars

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Affirmation extends Model
{
    protected $fillable = [
        'user_id',
        'file_path', // local path for now
        'file_type', // so we know how to display the file
    ];

    // an affirmation belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}