<?php

namespace Database\Seeders;

use App\Models\Citoyen;
use Illuminate\Database\Seeder;

class CitoyenSeeder extends Seeder
{
    public function run()
    {
        Citoyen::factory()
            ->count(10)
            ->create();
        
        Citoyen::create([
            'CIN' => 'JB520666',
            'Nom_personelle' => 'Mohamed',
            'Nom_familliale' => 'Salih',
            'Adresse' => 'Agadir',
            'telephone' => '0612345678'
        ]);
    }
}