<?php

namespace App\Http\Controllers;

use App\Models\Demandes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

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

    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Demandes::orderBy('created_at', 'desc')->get()
        ]);
    }
   
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'CIN' => 'required|string|exists:citoyens,CIN',
            'type' => 'required|string',
            'date_demande' => 'required|date_format:Y-m-d H:i:s',
            'Archive' => 'boolean',
            'status' => 'in:en_attente,approuvé,rejeté'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Tdrha Carbon
        $requestDate = Carbon::parse($request->date_demande);
        $dateOnly = $requestDate->format('Y-m-d');

        // limit 100 f nhar
        $dailyCount = Demandes::whereDate('date_demande', $dateOnly)->count();
        if ($dailyCount >= 100) {
            return response()->json([
                'message' => 'Daily demand limit reached (100 per day)',
                'errors' => ['date_demande' => 'Maximum 100 demandes allowed per day']
            ], 422);
        }

        // wach citoyen 3ndo demande f dak nhar
        $existingDemande = Demandes::where('CIN', $request->CIN)
            ->whereDate('date_demande', $dateOnly)
            ->first();

        if ($existingDemande) {
            return response()->json([
                'message' => 'Citoyen already has a demande for this day',
                'errors' => ['CIN' => 'Only one demande per day allowed per citoyen']
            ], 422);
        }

        $demande = Demandes::create([
            'CIN' => $request->CIN,
            'type' => $request->type,
            'date_demande' => $request->date_demande,
            'Archive' => $request->Archive ?? false,
            'status' => $request->status ?? 'en_attente'
        ]);

        return response()->json([
            'message' => 'Demande enregistrée',
            'data' => $demande
        ], 201);
    }
}