<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // database/migrations/xxxx_create_songs_table.php
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('english_title');
            $table->string('hindi_title')->nullable();
            $table->string('artist')->nullable();
            $table->text('english_lyric')->nullable();
            $table->text('hindi_lyric')->nullable();
            $table->string('youtube_link')->nullable();
            $table->json('tags')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
