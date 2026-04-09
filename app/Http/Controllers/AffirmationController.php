<?php

# last updated on 09/04 by mars

namespace App\Http\Controllers;

use App\Models\Affirmation;
use App\Http\Requests\StoreAffirmationRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

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
        
        $user = Auth::user();

        $file = $request->file('file');
        $file_name = $file->getClientOriginalName();
        $file_type = $file->getClientOriginalExtension();

        $folderPath = 'affirmations/' . $user->id;

        $localPath = $file->storeAs(
            $folderPath, 
            time() . '_' . $file_name, 
            'public'
        );

        $affirmation = Affirmation::create([
            'user_id' => Auth::id(),
            'file_path' => $localPath, 
            'file_type' => $file_type,
        ]);

        return redirect()->back()
            ->with('success', 'Affirmation created successfully.');
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

        // remove from local storage
        if (Storage::disk('public')->exists($affirmation->file_path)) {
            Storage::disk('public')->delete($affirmation->file_path);
        }

        $affirmation->delete();

        return redirect()->back()
            ->with('success', 'Affirmation deleted successfully.');
    }

    // download affirmation file
    public function download(Affirmation $affirmation)
    {
        if ($affirmation->user_id !== Auth::id()) {
            abort(403);
        }

        $filePath = storage_path('app/public/' . $affirmation->file_path);
        
        if (!file_exists($filePath)) {
            abort(404);
        }

        return response()->download($filePath);
    }
}
