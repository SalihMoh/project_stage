<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Citoyen extends Model
{
    use HasFactory;

    protected $fillable = [
        'CIN',
        'Nom_personelle',
        'Nom_familliale',
        'Adresse',
        'telephone'
    ];

    public function demandes()
        {
    return $this->hasMany(Demandes::class, 'CIN', 'CIN');
        }

    protected static function newFactory()
    {
        return \Database\Factories\CitoyenFactory::new();
    }
}