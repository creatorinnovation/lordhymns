<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/Song.php
class Song extends Model
{
    protected $fillable = [
        'english_title',
        'hindi_title',
        'artist',
        'english_lyric',
        'hindi_lyric',
        'youtube_link',
        'tags',
        'status',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
