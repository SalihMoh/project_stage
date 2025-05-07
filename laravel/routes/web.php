<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CitoyensController;
use App\Http\Controllers\DemandesController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\VerifyCsrfToken;

// Public routes
Route::get('/', function () {
    return view('welcome');
});

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Laravel dashboard (default)
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
     
    // Profile management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin panels
    Route::get('/AdmDML', [DemandesController::class, 'AdmDML'])->name('AdmDML');
    Route::get('/AdmCL', [CitoyensController::class, 'AdmCL']);
});

// Form page (public)
Route::get('/form-EC', [DemandesController::class, 'showForm']);

// Demand management
Route::get('/demandes', [DemandesController::class, 'index']);
Route::post('/demandes/by-cin', [DemandesController::class, 'check_dmd_citoyen']);
Route::get('/demandes/{id}', [DemandesController::class, 'show'])->middleware(VerifyCsrfToken::class);
Route::post('/demandes', [DemandesController::class, 'store'])->middleware(VerifyCsrfToken::class);
Route::put('/demandes/{id}', [DemandesController::class, 'update'])->middleware(VerifyCsrfToken::class);
Route::delete('/demandes/{id}', [DemandesController::class, 'destroy'])->middleware(VerifyCsrfToken::class);

// Citoyens management
Route::get('/citoyens', [CitoyensController::class, 'index'])->name('citoyens.index');
Route::post('/citoyens', [CitoyensController::class, 'store']);
Route::put('/citoyens/{id}', [CitoyensController::class, 'update']);
Route::delete('/citoyens/{id}', [CitoyensController::class, 'destroy']);

// Contact form
Route::get('/contact', [ContactController::class, 'index']);
Route::post('/api/contact', [ContactController::class, 'submit'])->middleware(VerifyCsrfToken::class);

// API endpoints (with CSRF disabled)
Route::prefix('api')->middleware([VerifyCsrfToken::class])->group(function () {
    Route::post('/check-citoyen', [CitoyensController::class, 'check_citoyen']);
    Route::get('/demandes/{id}', [DemandesController::class, 'show']);
    Route::post('/demandes', [DemandesController::class, 'store']);
    Route::put('/demandes/{id}', [DemandesController::class, 'update']);
    Route::delete('/demandes/{id}', [DemandesController::class, 'destroy']);
});

// Auth routes
require __DIR__.'/auth.php';
