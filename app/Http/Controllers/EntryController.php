<?php

# last updated on 04/04 by mars

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Media;
use App\Http\Requests\StoreEntryRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entries = Auth::user()->entries()
            ->with('media')
            ->orderBy('date', 'desc')
            ->get(['entries.id', 'journal_id', 'date', 'text_content', 'mood']);

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

            // media
            'media_files' => 'nullable|array',
            'media_files.*' => 'file|max:51200|mimes:jpeg,png,jpg,gif,mp4,mov,webm,wav,mp3,m4a', // 50mb maximum
            'captions' => 'nullable|array',
            'captions.*' => 'nullable|string|max:150',
        ]);

        $user = Auth::user();

        $entry = Entry::create($validated);

        if ($request->hasFile('media_files')) {
            foreach ($request->file('media_files') as $index => $file) {
                $file_type = $file->getClientOriginalExtension();

                $folderPath = 'entries/' . $entry->id . '/media/' . $user->id;

                $filename = time() . '_' . $index . '.' . $file_type;
                
                $localPath = $file->storeAs(
                    $folderPath,
                    $filename,
                    'public'
                );

                // get caption for current media file
                $caption = $request->input('captions.' . $index, null);

                Media::create([
                    'entry_id' => $entry->id,
                    'file_path' => $localPath,
                    'file_type' => $file_type,
                    'caption' => $caption,
                ]);
            }
        }
        
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

        $entry->load('media');

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

        foreach ($entry->media as $media) {
            if (Storage::disk('public')->exists($media->file_path)) {
                Storage::disk('public')->delete($media->file_path);
            }
            $media->delete();
        }

        $entry->delete();

        return redirect()->back()->with('success', 'Entry deleted successfully.');
    }

    public function downloadMedia(Media $media)
    {
        if ($media->entry->user_id !== Auth::id()) {
            abort(403);
        }

        $filePath = storage_path('app/public/' . $media->file_path);
        
        if (!file_exists($filePath)) {
            abort(404);
        }

        return response()->download($filePath);
    }
    
    public function deleteMedia(Media $media)
    {
        if ($media->entry->user_id !== Auth::id()) {
            abort(403);
        }

        // remove from local storage
        if (Storage::disk('public')->exists($media->file_path)) {
            Storage::disk('public')->delete($media->file_path);
        }

        $media->delete();
    }
    
}
