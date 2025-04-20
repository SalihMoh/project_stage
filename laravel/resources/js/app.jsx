import "./bootstrap"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "./Header/Header"
import Acceuil from "./Home/Acceuil"
import Footer from "./Footer/Footer"
import FormEC from "./Forms/form-EC"
import Contact from "./Contact/Contact"
import React from "react"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/form-EC" element={<FormEC />} />
          <Route path="/form-U" element={<formU />} />
          <Route path="/form-TL" element={<form-TL />} />
          <Route path="/form-S" element={<from-S />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

if (document.getElementById("app")) {
  const root = createRoot(document.getElementById("app"))
  root.render(<App />)
}
