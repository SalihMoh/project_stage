import React from "react";
import '../css/Acceuil.css'
import logo from '../../img/idcard.png';
import logo2 from '../../img/urban.png';
import logo3 from '../../img/taxicon.png';
import logo4 from '../../img/signalement.png';

function Acceuil () {
return (<div className="div-holder">
    <div className="div-bienvenu">
        <h3>Bienvenu à Notre site de commune</h3>
        <p>Découvrez notre commune dynamique et accédez à nos services en ligne pour faciliter votre quotidien.</p>
        <div className="buttons">
            <button><a href="">Nos Services</a></button>
            <button><a href="">Contact</a></button>
        </div>
    </div>
    <div className="div-service">
        <h3>accés rapide à nos service</h3>
        <p>Accédez facilement à nos services en ligne pour effectuer vos démarches administratives sans vous déplacer.</p>
        <div className="service-container">

            <div className="états-civil-service">
                <div className="service-icon">
                    <img src={logo} alt="img0" />
                    <p>états-civil</p>
                </div>
                <p>Actes de naissance, mariage et décès</p>
                <a href="">Demander</a>

            </div>

            <div className="urbanisme">
                <div className="service-icon">
                    <img src={logo2} alt="img1" />
                    <p>urbanisme</p> 
                </div>
                <p>Permis de construire et autorisations</p>
                <a href="">Demander</a>
            </div>

            <div className="taxe-locale">
                <div className="service-icon">
                    <img src={logo3} alt="img2" />
                    <p>taxe-locale</p>
                </div>
                <p>Paiement en ligne des taxes municipales</p>
                <a href="">Demander</a>

            </div>
            <div className="signalement">
                <div className="service-icon">
                    <img src={logo4} alt="img3" />
                    <p>signalement</p>
                </div>
                <p>Signaler un problème dans votre quartier</p>
                <a href="">Demander</a>
            </div>
        </div>
    </div>
    </div>
    
)

}

export default Acceuil;