<?php

use App\Http\Controllers\DemandesController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome'); 
});




Route::get('/form-EC', [DemandesController::class, 'showForm']);


Route::get('/demandes', [DemandesController::class, 'index']);
