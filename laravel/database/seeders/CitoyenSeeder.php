<?php

namespace Database\Seeders;

use App\Models\Citoyen;
use Illuminate\Database\Seeder;

class CitoyenSeeder extends Seeder
{
    public function run()
    {
        // Create 50 citoyens using the factory
        Citoyen::factory()
            ->count(10)
            ->create();
        
        // Alternatively, create specific records
        Citoyen::create([
            'CIN' => 'JB520666',
            'Nom_personelle' => 'Jean',
            'Nom_familliale' => 'Bono',
            'Adresse' => '123 Rue Principale, Casablanca',
            'telephone' => '0612345678'
        ]);
    }
}