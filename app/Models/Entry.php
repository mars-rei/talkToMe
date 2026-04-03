<?php

# last updated on 03/04 by mars

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    use HasFactory;

    protected $fillable = [
        'journal_id',
        'date', 
        'text_content', // actual entry
        'mood', // in entry editor the user can choose from a list of moods
    ];

    // a journal entry belongs to a journal
    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }

    // a journal entry can have many media 
    public function media()
    {
        return $this->hasMany(Media::class);
    }
}