import React from "react";
import '../../css/Home/Acceuil.css';

import logo from '../../../img/idcard.png';
import logo4 from '../../../img/signalement.png';
import logo5 from '../../../img/9asrbaladi.jpg';
import FreeMap from "./MapContainer";
import SuivreDmdPopup from "../Suivre_dmd/Suivre_dmd.jsx";

function Acceuil() {
  return (
    <div className="div-holder">
      <div className="div-bienvenu">
        <h3>Bienvenue à Notre site de commune</h3>
        <p>Découvrez notre commune dynamique et accédez à nos services en ligne pour faciliter votre quotidien.</p>
      </div>

      <div className="div-service">
        <h3>Accès rapide à nos services</h3>
        <p>Accédez facilement à nos services en ligne pour effectuer vos démarches administratives sans vous déplacer.</p>

        <div className="service-container">
          <div className="états-civil-service">
            <div className="service-icon">
              <img src={logo} alt="État civil" />
            </div>
            <p>Actes de naissance, mariage et décès</p>
            <a href="/form-EC">Demander</a>
          </div>

          <div className="signalement">
            <div className="service-icon">
              <img src={logo4} alt="Signalement" />
            </div>
            <p>Signaler un problème dans votre quartier</p>
            <a href="/form-S">Demander</a>
          </div>
        </div>

        <div key="popup-container">
          <SuivreDmdPopup key="suivre-demande-popup" />
        </div>

        <div className="info-DEJ">
          <h3>Info sur Dcheira-el-Jihadia</h3>
          <p>
            Aujourd'hui, Dchirah El Jahidiya est classée parmi les grandes villes, avec une population totale de 100 336 habitants lors du recensement de 2014.
            Elle est le quatrième pôle urbain du groupe urbain du Grand Agadir, après Agadir, Ait Melloul et Inezgane...
          </p>

          <div className="info-COM">
            <h3>Commune Dcheira-Jihadia</h3>
            <div>
              <img src={logo5} alt="Commune" />
              <FreeMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acceuil;
