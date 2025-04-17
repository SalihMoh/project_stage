<?php

namespace App\Http\Controllers;

use App\Models\Citoyen;
use Illuminate\Http\Request;

class CitoyensController extends Controller
{
    public function index()
    {
        return response() -> json([
             'succes' => true, 'data' => Citoyen::Orderby('created_at' , 'desc') -> get()
        ]);
    }
    public function AdmCL ()
    {
        return view('welcome');
    }
    
    public function check_citoyen(Request $request)
    {
    $validated = $request->validate([
        'CIN' => 'required|string',
    ]);

    $exists = Citoyen::where('CIN', $request->CIN)->exists();

    return response()->json([
        'exists' => $exists
    ]);
    }

   
}
