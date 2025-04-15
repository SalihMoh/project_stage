<?php

namespace Database\Factories;

use App\Models\Citoyen;
use Illuminate\Database\Eloquent\Factories\Factory;

class CitoyenFactory extends Factory
{
    protected $model = Citoyen::class;

    public function definition()
    {
        return [
            'CIN' => $this->generateCIN(),
            'Nom_personelle' => $this->faker->firstName(),
            'Nom_familliale' => $this->faker->lastName(),
            'Adresse' => $this->faker->address(),
            'telephone' => $this->faker->optional()->phoneNumber(),
        ];
    }

    private function generateCIN(): string
    {
        return strtoupper($this->faker->randomLetter().$this->faker->randomLetter()).
               $this->faker->numerify('######');
    }
}