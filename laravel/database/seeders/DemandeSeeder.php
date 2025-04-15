<?php

namespace Database\Seeders;
use App\Models\Demandes;
use Illuminate\Database\Seeder;

class DemandeSeeder extends Seeder
{
    public function run()
    {
        // Create 200 demandes
        Demandes::factory()
            ->count(20)
            ->create();
    }
}