import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header';
import Acceuil from './Acceuil';

// Example: A simple React component
function App() {
    return (
    <div>
        <Header />
        <Acceuil />
    </div>
    )
}

// Render React inside the #app div (in your Blade file)
if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}