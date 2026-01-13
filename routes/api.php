<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\SongController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Sanctum;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::group(['middleware' => 'auth:sanctum'],function(){
//     Route::get('song-list', [SongController::class, 'index']);
//     Route::post('song-add', [SongController::class, 'store']);
//     Route::put('song-update/{id}', [SongController::class, 'update']);
//     Route::get('song-show/{id}', [SongController::class, 'show']);
//     Route::delete('song-delete/{id}', [SongController::class, 'destroy']);
//     Route::delete('song-status/{id}', [SongController::class, 'updateStatus']);

// });

 // Protected Routes: Requires a valid Bearer Token (Sanctum)
    Route::middleware('auth:sanctum')->group(function () {
        
        // Resource-style routes for Lyric Management
        Route::get('/lyrics', [SongController::class, 'index']);          // Fetch all
        Route::post('/lyrics', [SongController::class, 'store']);         // Create new
        Route::put('/lyrics/{id}', [SongController::class, 'update']);    // Update whole record
        Route::delete('/lyrics/{id}', [SongController::class, 'destroy']); // Delete record
        
        // Custom PATCH route for status toggle (matching your controller method)
        Route::patch('/lyrics/{id}/status', [SongController::class, 'updateStatus']);
        
    });
