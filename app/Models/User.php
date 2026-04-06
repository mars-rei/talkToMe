<?php

# last updated on 02/04 by mars

namespace App\Models;

use App\Models\Entry;
use App\Models\Journal;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // a user can have many journals
    public function journals()
    {
        return $this->hasMany(Journal::class);
    }

    public function entries()
    {
        return $this->hasManyThrough(Entry::class, Journal::class);
    }

    // a user can have many affirmations
    public function affirmations()
    {
        return $this->hasMany(Affirmation::class);
    }

    // a user can have many developments
    public function developments()
    {
        return $this->hasMany(Development::class);
    }
}
