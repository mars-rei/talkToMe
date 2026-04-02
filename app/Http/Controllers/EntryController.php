<?php

# last updated on 02/04 by mars

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Http\Requests\StoreEntryRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entries = Auth::user()->entries()
            ->orderBy('date', 'desc')
            ->get(['id', 'journal_id', 'date', 'text_content', 'mood']);

        return Inertia::render('Entries/Index', [
            'entries' => $entries
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Entries/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'journal_id' => 'required|exists:journals,id',
            'date' => 'required|date',
            'text_content' => 'required|string',
            'mood' => 'nullable|string',
        ]);

        $validated['user_id'] = Auth::id();

        $entry = Entry::create($validated);
        
        return redirect()->back()->with('success', 'Entry created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Entry $entry)
    {
        if ($entry->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Entries/Show', [
            'entry' => $entry
        ]);
    }

    // deleted edit and update as these are not needed

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entry $entry)
    {
        if ($entry->journal->user_id !== Auth::id()) {
            abort(403);
        }

        $entry->delete();

        return redirect()->back()->with('success', 'Entry deleted successfully.');
    }
    
}
