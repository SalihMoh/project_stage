import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Acceuil from './Home/Acceuil';
import Footer from './Footer/Footer';
import FormEC  from './Forms/form-EC';
import DemandesTable from '../js/AdminTest/AdminDemandeList.jsx';
import CitoyensTable from './AdminTest/AdminCitoyenList.jsx';
import EspaceAdmin from './AdminTest/EspaceAdmin.jsx';

function App() {
    return (
        <BrowserRouter>

            <Header />

            <Routes>
                <Route path="/" element={[ <EspaceAdmin />,<Acceuil />]} />
                <Route path='/form-EC' element= { <FormEC />} />
                <Route path='/AdmDML' element = { <DemandesTable />} />
                <Route path='/AdmCL' element = { <CitoyensTable />} />

            </Routes>  

            <Footer />

        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}
