<?php
namespace App\Http\Controllers;

use App\Models\Citoyen;
use Illuminate\Http\Request;

class CitoyensController extends Controller
{
    // READ
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Citoyen::orderBy('created_at', 'desc')->get()
        ]);
    }

    // CREATE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'CIN' => 'required|string|unique:citoyens',
            'Nom_personelle' => 'required|string',
            'Nom_familliale' => 'required|string',
            'Adresse' => 'required|string',
            'telephone' => 'required|string',
        ]);

        $citoyen = Citoyen::create($validated);

        return response()->json(['success' => true, 'data' => $citoyen]);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $citoyen = Citoyen::findOrFail($id);

        $validated = $request->validate([
            'Nom_personelle' => 'string',
            'Nom_familliale' => 'string',
            'Adresse' => 'string',
            'telephone' => 'string',
        ]);

        $citoyen->update($validated);

        return response()->json(['success' => true, 'data' => $citoyen]);
    }

    // DELETE
    public function destroy($id)
    {
        $citoyen = Citoyen::findOrFail($id);
        $citoyen->delete();

        return response()->json(['success' => true, 'message' => 'Citoyen supprimé.']);
    }

    // Optional: view route
    public function AdmCL()
    {
        return view('welcome');
    }

    // Check CIN
    public function check_citoyen(Request $request)
    {
        $validated = $request->validate([
            'CIN' => 'required|string',
        ]);

        $exists = Citoyen::where('CIN', $request->CIN)->exists();

        return response()->json(['exists' => $exists]);
    }
}
