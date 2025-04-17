<?php

namespace App\Http\Controllers;

use App\Models\Citoyen;
use Illuminate\Http\Request;

class CitoyensController extends Controller
{
    public function index()
    {
        return response() -> json([
             'succes' => true, 'data' => Citoyen::Orderby('created_at' , 'desc') -> get()
        ]);
    }
}
