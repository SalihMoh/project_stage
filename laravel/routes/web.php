<?php

use App\Http\Controllers\CitoyensController;
use App\Http\Controllers\DemandesController;
use App\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome'); 
});

Route::get('/form-EC', [DemandesController::class, 'showForm']);


Route::get('/demandes', [DemandesController::class, 'index']);

Route::get('/citoyens', [CitoyensController::class, 'index'])->name('citoyens.index');


Route::get('/test', [DemandesController::class, 'test']);



Route::prefix('api')->middleware([VerifyCsrfToken::class])->group(function () {

    Route::post('/check-citoyen', [CitoyensController::class, 'check_citoyen']);


    Route::get('/demandes/{id}', [DemandesController::class, 'show']);

    Route::post('/demandes', [DemandesController::class, 'store']);


    Route::put('/demandes/{id}', [DemandesController::class, 'update']);

    Route::delete('/demandes/{id}', [DemandesController::class, 'destroy']);

});



