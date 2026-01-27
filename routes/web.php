<?php

use App\Http\Controllers\Dashboard\SongController;
use App\Http\Controllers\GospelSongsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;






// Route::get('/gospel-songs', function () {
//     return Inertia::render('GospelSongs');
// })->name('gospel-songs');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });



Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('/dashboard/lyrics', [LyricsController::class, 'index'])->name('dashboard.lyrics');
    // Route::get('/dashboard/lyrics/create', [LyricsController::class, 'create'])->name('dashboard.lyrics.create');
    // Route::post('/dashboard/lyrics/store', [LyricsController::class, 'store'])->name('dashboard.lyrics.store');
    // Route::get('/dashboard/lyrics/edit', [LyricsController::class, 'edit'])->name('dashboard.lyrics.edit');
});

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/gospel-songs', [GospelSongsController::class, 'index'])->name('gospel-songs');
Route::get('/gospel-song/{song}/detail', [GospelSongsController::class, 'detail'])->name('gospelsong.detail');


// सामान्य यूजर रूट्स
Route::middleware(['auth', 'verified'])->group(function () {});

// एडमिन रूट्स (Admin Middleware के साथ)
Route::middleware(['auth', 'admin'])->group(function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/AdminDashboard');
    })->name('admin.dashboard');

    // admin/songs
    Route::resource('/admin/songs', SongController::class);
    Route::patch('/songs/{song}/status', [SongController::class, 'toggleStatus'])
        ->name('songs.status');

    // Route::get('/dashboard', function () {
    //     return Inertia::render('Dashboard');
    // })->middleware(['auth', 'verified'])->name('dashboard');
});

require __DIR__ . '/auth.php';
