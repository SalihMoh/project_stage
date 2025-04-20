import React from "react";
import '../../css/Footer/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-inner">
          <p className="mb-4 mb-md-1">
            &copy; {new Date().getFullYear()} Commune de Dcheira-Jihadia. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
