<?php

# last updated on 09/04 by mars

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Http\Requests\StoreJournalRequest;
use App\Http\Requests\UpdateJournalRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $journals = Auth::user()->journals()
            ->orderBy('id', 'desc')
            ->get(['id', 'user_id', 'title']);

        return Inertia::render('Journals/Index', [
            'journals' => $journals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Journals/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJournalRequest $request)
    {
        $validated = $request->validated();
        
        $validated['user_id'] = Auth::id();

        $journal = Journal::create($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Journal created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Journal $journal)
    {
        if ($journal->user_id !== Auth::id()) {
            abort(403);
        }

        $entries = Auth::user()->entries()
            ->with('media')
            ->where('journal_id', $journal->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Journals/Show', [
            'journal' => $journal,
            'entries' => $entries 
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Journal $journal)
    {
        if ($journal->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Journals/Edit', [
            'journal' => $journal        
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJournalRequest $request, Journal $journal)
    {
        if ($journal->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validated();
        
        $journal->update([
            'title' => $validated['title']
        ]);

        return redirect()->back()
            ->with('success', 'Journal details updated successfully.'); // goes back to dashboard - unsure on how to fix this
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Journal $journal)
    {
        if ($journal->user_id !== Auth::id()) {
            abort(403);
        }

        $journal->delete();

        return redirect()->back()
            ->with('success', 'Journal deleted successfully.');
    }
}
