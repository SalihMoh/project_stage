<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use PhpParser\Node\Expr\Cast\Bool_;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demandes' , function (Blueprint $table){
            $table -> id();
            $table -> string('CIN');
            $table -> string('type');
            $table -> foreign('CIN')->references('CIN')->on('citoyens')->onDelete('cascade');
            $table->  date('date_demande'); 
            $table->  boolean('Archive')->nullable()->default(false);
            $table -> enum('status' , ['en_attente','approuvé','rejeté']);
            $table -> timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};
