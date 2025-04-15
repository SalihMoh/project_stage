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
            'date_demande' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'Archive' => $this->faker->boolean(20), // 20% chance of being archived
            'status' => $this->faker->randomElement([
                'en_attente', 
                'approuvé', 
                'rejeté'
            ]),
        ];
    }
}