<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     * Matches GET /api/v1/lyrics
     */
    public function index()
    {
        $lyrics = Song::latest()->get();
        return response()->json($lyrics);
    }

    /**
     * Store a newly created resource in storage.
     * Matches POST /api/v1/lyrics
     */
    public function store(Request $request)
    {
        $song = new Song();
        $song->english_title = $request->english_title;
        $song->hindi_title   = $request->hindi_title;
        $song->artist        = $request->artist;
        $song->english_lyric = $request->english_lyric;
        $song->hindi_lyric   = $request->hindi_lyric;
        $song->youtube_link  = $request->youtube_link;
        $song->tags          = $request->tags;
        $song->status        = $request->status;
        $song->save();

        return response()->json([
            'success' => true,
            'message' => 'Song saved successfully',
            'song'    => $song
        ], 201);

        // $validator = Validator::make($request->all(), [
        //     'english_title' => 'required|string|min:3',
        //     'hindi_title'   => 'required|string',
        //     'artist'        => 'required|string',
        //     'english_lyric' => 'required|string',
        //     'hindi_lyric'   => 'required|string',
        //     'youtube_link'  => 'nullable|url',
        //     'tags'          => 'nullable|string',
        //     'status'        => 'required|in:Active,Deactive'
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['message' => 'Validation Error', 'errors' => $validator->errors()], 422);
        // }

        // $lyric = Song::create($request->all());

        // return response()->json($lyric, 201);
    }

    /**
     * Update the specified resource in storage.
     * Matches PUT /api/v1/lyrics/{id}
     */
    public function update(Request $request, $id)
    {
        $lyric = Song::find($id);

        if (!$lyric) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $lyric->update($request->all());

        return response()->json($lyric);
    }

    /**
     * Update specific status.
     * Matches PATCH /api/v1/lyrics/{id}/status
     */
    public function updateStatus(Request $request, $id)
    {
        $lyric = Song::find($id);

        if (!$lyric) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $lyric->update(['status' => $request->status]);

        return response()->json(['message' => 'Status updated', 'status' => $lyric->status]);
    }

    /**
     * Remove the specified resource from storage.
     * Matches DELETE /api/v1/lyrics/{id}
     */
    public function destroy($id)
    {
        $lyric = Song::find($id);

        if (!$lyric) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $lyric->delete();

        return response()->json(['message' => 'Record deleted successfully']);
    }

    public function all_lyrics(Request $request)
    {
        $search = $request->query('search');
        $limit  = $request->query('limit', 10);

        $songs = Song::when($search, function ($query) use ($search) {
            $query->where('english_title', 'LIKE', "%$search%")
                ->orWhere('artist', 'LIKE', "%$search%");
        })
            ->orderBy('english_title', 'ASC') // Alphabetical A-Z
            ->paginate($limit);

        return response()->json([
            'success' => true,
            'songs'   => $songs->items(),
            'total'   => $songs->total(),
            'current_page' => $songs->currentPage(),
            'last_page'    => $songs->lastPage(),
        ]);
    }

    public function showid($id)
    {
        $song = Song::findOrFail($id);

        return response()->json([
            'success' => true,
            'song' => $song
        ]);
    }
}
