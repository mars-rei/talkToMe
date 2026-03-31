<?php

namespace App\Http\Controllers;

use App\Models\Development;
use App\Http\Requests\StoreDevelopmentRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DevelopmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $developments = Auth::user()->developments()
            ->orderBy('date', 'desc')
            ->get(['id', 'user_id', 'date', 'text_content']);

        return Inertia::render('Developments/Index', [
            'developments' => $developments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Developments/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDevelopmentRequest $request)
    {
        $validated = $request->validated();
        
        $validated['user_id'] = Auth::id();

        $development = Development::create($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Development created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Development $development)
    {
        if ($development->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Developments/Show', [
            'development' => $development
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Development $development)
    {
        if ($development->user_id !== Auth::id()) {
            abort(403);
        }

        $development->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Development deleted successfully.');
    }
}
