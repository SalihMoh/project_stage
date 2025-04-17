<?php

namespace App\Http\Controllers;
use App\Models\Demandes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class DemandesController extends Controller
{
    public function showForm()
    {
        return view('welcome');
    }

    public function test()
    {
       return view('welcome');
    }
    
    public function index2()
{
    $demandes = Demandes::all();
    return response()->json($demandes);
}

   public function index ()
   {
    return response()->json([
        'success' => true,
        'data' => Demandes::orderBy('created_at', 'desc')->get()
    ]);
   }
   
   public function store (Request $request)
   {
       $validator = Validator::make($request -> all(), [
        'CIN' => 'required|string|exists:citoyens,CIN' ,
        'type' => 'required|string',
        'date_demande' => 'date',
        'Archive' => 'Bool',
        'status' => 'in:en_attente,approuvé,rejeté'
       ]
    );

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }
     $demande = Demandes::create([
        'CIN' => $request -> CIN ,
        'type' => $request -> type,
        'date_demande' => $request -> date_demande,
        'Archive' => $request -> Archive,
        'status' => $request -> status
     ]) ;

     return response() -> json(['message' => 'demande enregistré' , 'data' => $demande] , 201);

   }
   
};
