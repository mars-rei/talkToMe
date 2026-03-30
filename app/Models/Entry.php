<?php

# last updated on 30/03 by mars

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
        'type', // whether the entry is a normal journal entry, improvement note, for the positive wall
    ];

    // a journal entry belongs to a journal
    public function journals()
    {
        return $this->belongsTo(Journal::class);
    }
}