import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./Header/Header";
import Acceuil from "./Home/Acceuil";
import Footer from "./Footer/Footer";
import FormEC from "./Forms/form-EC";
import Contact from "./Contact/Contact";

// Admin Components
import DemandesTable from './AdminTest/AdminDemandeList.jsx';
import CitoyensTable from './AdminTest/AdminCitoyenList.jsx';
import EspaceAdmin from './AdminTest/EspaceAdmin.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/form-EC" element={<FormEC />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<EspaceAdmin />} />
          <Route path="/AdmDML" element={<DemandesTable />} />
          <Route path="/AdmCL" element={<CitoyensTable />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

if (document.getElementById("app")) {
  const root = createRoot(document.getElementById("app"));
  root.render(<App />);
}
