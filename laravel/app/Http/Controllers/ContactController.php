<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Display the contact page.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('welcome');
    }

    /**
     * Handle the contact form submission.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:2',
            'email' => 'required|email',
            'subject' => 'required|min:2',
            'message' => 'required|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // You can send an email here
            Mail::to('contact@commune-dcheira.ma')->send(new ContactFormMail($request->all()));
            
            // Or store in database
            // Contact::create($request->all());
            
            return response()->json(['message' => 'Message envoyé avec succès'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Une erreur est survenue: ' . $e->getMessage()], 500);
        }
    }
}
