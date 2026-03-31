<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// for email verification to add later on
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

// for journals
use App\Http\Controllers\JournalController;

// for developments
use App\Http\Controllers\DevelopmentController;

// for dashboard
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// dashboard routes
Route::get('/dashboard', function () {
    $user = Auth::user();
    
    $journals = $user ? $user->journals()
        ->orderBy('id', 'desc')
        ->get(['id', 'title']) : [];

    $developments = $user ? $user->developments()
        ->orderBy('date', 'desc')
        ->get(['id', 'date', 'text_content']) : [];

    return Inertia::render('Dashboard', [
        'journals' => $journals,
        'developments' => $developments,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// journal routes
Route::middleware(['auth'])->group(function () {
    Route::get('/journals', [JournalController::class, 'index'])->name('journals.index');
    Route::get('/journals/create', [JournalController::class, 'create'])->name('journals.create'); 
    Route::post('/journals', [JournalController::class, 'store'])->name('journals.store');
    Route::get('/journals/{journal}/edit', [JournalController::class, 'edit'])->name('journals.edit');
    Route::put('/journals/{journal}', [JournalController::class, 'update'])->name('journals.update');
    Route::delete('/journals/{journal}', [JournalController::class, 'destroy'])->name('journals.destroy');
    Route::get('/journals/{journal}', [JournalController::class, 'show'])->name('journals.show');
});

// development routes
Route::middleware(['auth'])->group(function () {
    Route::get('/developments', [DevelopmentController::class, 'index'])->name('developments.index');
    Route::get('/developments/create', [DevelopmentController::class, 'create'])->name('developments.create'); 
    Route::post('/developments', [DevelopmentController::class, 'store'])->name('developments.store');
    Route::delete('/developments/{development}', [DevelopmentController::class, 'destroy'])->name('developments.destroy');
    Route::get('/developments/{development}', [DevelopmentController::class, 'show'])->name('developments.show');
});