import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Acceuil from './Acceuil';
import Footer from './Footer';
import FormEC  from './form-EC';

function App() {
    return (
        <BrowserRouter>

            <Header />

            <Routes>
                <Route path="/" element={<Acceuil />} />
                <Route path='/form-EC' element= { <FormEC />} />
                <Route path='/form-U'  element= { <formU />} />
                <Route path='/form-TL' element= { <form-TL />} />
                <Route path='/form-S'  element= { <from-S />} />
            </Routes>  

            <Footer />

        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}
