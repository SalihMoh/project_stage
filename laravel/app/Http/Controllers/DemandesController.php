<?php

namespace App\Http\Controllers;

use App\Models\Demandes;
use Illuminate\Http\Request;

class DemandesController extends Controller
{
    public function showForm()
    {
        return view('welcome');
    }

   public function index (){
    return response()->json([
        'success' => true,
        'data' => Demandes::orderBy('created_at', 'desc')->get()
    ]);
   }
   
}
