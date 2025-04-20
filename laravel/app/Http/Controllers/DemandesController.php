<?php

namespace App\Http\Controllers;

use App\Models\Citoyen;
use App\Models\Demandes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class DemandesController extends Controller
{
    public function AdmDML()
    {
        return view('welcome');
    }

    public function showform()
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

        $requestDate = Carbon::parse($request->date_demande);
        $dateOnly = $requestDate->format('Y-m-d');

        $dailyCount = Demandes::whereDate('date_demande', $dateOnly)->count();
        if ($dailyCount >= 100) {
            return response()->json([
                'message' => 'Daily demand limit reached (100 per day)',
                'errors' => ['date_demande' => 'Maximum 100 demandes allowed per day']
            ], 422);
        }

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

    public function show($id)
    {
        $demande = Demandes::find($id);

        if (!$demande) {
            return response()->json([
                'success' => false,
                'message' => 'Demande not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $demande
        ]);
    }

    public function update(Request $request, $id)
    {
        $demande = Demandes::find($id);

        if (!$demande) {
            return response()->json([
                'success' => false,
                'message' => 'Demande not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|string',
            'date_demande' => 'sometimes|date_format:Y-m-d H:i:s',
            'Archive' => 'sometimes|boolean',
            'status' => 'sometimes|in:en_attente,approuvé,rejeté'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $demande->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Demande updated',
            'data' => $demande
        ]);
    }

    public function destroy($id)
    {
        $demande = Demandes::find($id);

        if (!$demande) {
            return response()->json([
                'success' => false,
                'message' => 'Demande not found'
            ], 404);
        }

        $demande->delete();

        return response()->json([
            'success' => true,
            'message' => 'Demande deleted successfully'
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:en_attente,approuvé,rejeté'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $demande = Demandes::find($id);

        if (!$demande) {
            return response()->json([
                'success' => false,
                'message' => 'Demande not found'
            ], 404);
        }

        $demande->status = $request->status;
        $demande->save();

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data' => $demande
        ]);
    }

    public function check_dmd_citoyen(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'CIN' => 'required|string|exists:citoyens,CIN',
        ], [
            'CIN.exists' => 'The provided CIN does not exist in our records'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $cin = $request->input('CIN');

        $citoyen = Citoyen::with(['demandes' => function($query) {
            $query->orderBy('date_demande', 'desc');
        }])->where('CIN', $cin)->first();

        if (!$citoyen) {
            return response()->json([
                'success' => false,
                'message' => 'Citizen not found'
            ], 404);
        }

        if ($citoyen->demandes->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'No demands found for this CIN',
                'data' => []
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $citoyen->demandes
        ]);
    }
}
