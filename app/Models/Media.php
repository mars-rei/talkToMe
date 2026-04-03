<?php

# last updated on 03/04 by mars

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'entry_id',
        'file_path', // local path for now
        'file_type', // so we know how to display the file
        'caption',
    ];

    // a piece of media belongs to a journal entry
    public function entry()
    {
        return $this->belongsTo(Entry::class);
    }
}