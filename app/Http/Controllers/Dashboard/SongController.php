<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SongController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'english_title');
        $direction = $request->query('direction', 'asc');

        $songs = Song::when($search, function ($query) use ($search) {
            $query->where('english_title', 'like', "%{$search}%")
                ->orWhere('hindi_title', 'like', "%{$search}%")
                ->orWhere('artist', 'like', "%{$search}%");
        })
            ->orderBy($sort, $direction)
            ->latest()
            ->paginate(100)
            ->withQueryString();

        return Inertia::render('Dashboard/Songs/Index', [
            'songs'  => $songs,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Songs/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'english_title' => 'required',
            'hindi_title' => 'nullable',
            'artist' => 'nullable',
            'english_lyric' => 'nullable',
            'hindi_lyric' => 'nullable',
            'youtube_link' => 'nullable|url',
            'tags' => 'array',
            'status' => 'required',
        ]);

        Song::create($data);

        return redirect()->route('songs.index');
    }

    public function edit(Song $song)
    {
        return Inertia::render('Dashboard/Songs/Edit', [
            'song' => $song,
        ]);
    }

    public function update(Request $request, Song $song)
    {
        $data = $request->validate([
            'english_title' => 'required',
            'hindi_title' => 'nullable',
            'artist' => 'nullable',
            'english_lyric' => 'nullable',
            'hindi_lyric' => 'nullable',
            'youtube_link' => 'nullable|url',
            'tags' => 'array',
            'status' => 'required',
        ]);

        $song->update($data);

        return redirect()->route('songs.index');
    }

    public function destroy(Song $song)
    {
        $song->delete();
        return back();
    }

    public function toggleStatus(Song $song)
    {
        $song->update([
            'status' => $song->status === 'active' ? 'inactive' : 'active',
        ]);

        return back();
    }
}
