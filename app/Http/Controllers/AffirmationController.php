<?php

namespace App\Http\Controllers;

use App\Models\Affirmation;
use App\Http\Requests\StoreAffirmationRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AffirmationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $affirmations = Auth::user()->affirmations()
            ->orderBy('id', 'desc')
            ->get(['id', 'user_id', 'file_path', 'file_type']);

        return Inertia::render('Affirmations/Index', [
            'affirmations' => $affirmations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Affirmations/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAffirmationRequest $request)
    {
        $validated = $request->validated();
        
        $validated['user_id'] = Auth::id();

        $affirmation = Affirmation::create($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Affirmation created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Affirmation $affirmation)
    {
        if ($affirmation->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Affirmations/Show', [
            'affirmation' => $affirmation
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Affirmation $affirmation)
    {
        if ($affirmation->user_id !== Auth::id()) {
            abort(403);
        }

        $affirmation->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Affirmation deleted successfully.');
    }
}
