<?php

namespace Database\Factories;

use App\Models\Citoyen;
use Illuminate\Database\Eloquent\Factories\Factory;

class DemandesFactory extends Factory
{
    public function definition()
    {
        return [
            'CIN' => Citoyen::inRandomOrder()->first()->CIN ?? Citoyen::factory(),
            'type' => $this ->faker -> randomElement(['Acte de naissance', 'Acte de Mariage', 'Acte de Décès']),
            'date_demande' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'Archive' => $this->faker->boolean(20), 
            'status' => $this->faker->randomElement([
                'en_attente', 
                'approuvé', 
                'rejeté'
            ]),
        ];
    }
}