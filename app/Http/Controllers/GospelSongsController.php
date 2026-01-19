<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;


class GospelSongsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'english_title');
        $direction = $request->query('direction', 'asc');

        $songs = Song::active()   // 👈 clean & reusable MODEL se scopeActive ke dwara
            //where('status', 'active')   // ✅ ONLY ACTIVE
            ->when($search, function ($query) use ($search) {
                $query->where('english_title', 'like', "%{$search}%")
                    ->orWhere('hindi_title', 'like', "%{$search}%")
                    ->orWhere('artist', 'like', "%{$search}%");
            })
            ->orderBy($sort, $direction)
            //->latest()
            ->paginate(5)
            ->withQueryString();

        // 🔥 Important
        if ($request->wantsJson()) {
            return response()->json($songs);
        }

        return Inertia::render('GospelSongs/SongsList', [
            'songs'  => $songs,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function detail($id)
    {
        $song = Song::where('id', $id)
            ->where('status', 'active')
            ->firstOrFail();   // 👈 inactive → 404

        return Inertia::render('GospelSongs/SongDetail', [
            'song' => $song,
        ]);
    }

    

    
}
