<?php

# last updated on 30/03 by mars

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
    public function entries()
    {
        return $this->belongsTo(Entry::class);
    }
}