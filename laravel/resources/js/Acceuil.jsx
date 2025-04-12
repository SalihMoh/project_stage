import React from "react";
import '../css/Acceuil.css'
import logo from '../../img/idcard.png';
import logo2 from '../../img/urban.png';
import logo3 from '../../img/taxicon.png';
import logo4 from '../../img/signalement.png';
import logo5 from '../../img/9asrbaladi.jpg';

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
        
        <div className="info-COM">
          <h3>Commune Dcheira-Jihadia</h3>
          <img src={logo5} alt="commune" />
        </div>
        <div className="info-DEJ">
            <h3>Info sur Dcheira-el-Jihadia</h3>
            <p>
                Aujourd'hui, Dchirah El Jahidiya est classée parmi les grandes villes, avec une population totale de 100 336 habitants lors du recensement de 2014. Elle est le quatrième pôle urbain du groupe urbain du Grand Agadir, après Agadir (421 844 habitants), Ait Melloul (171 847 habitants) et Inezgane (130 333 habitants).
                La ville de Dchira El Jahdiya est l'un des trois pôles de la commune d'Anzakan Ait Melloul, non seulement par sa taille démographique, mais aussi par l'évolution de son rôle, puisqu'elle est devenue une ville industrielle avec Ait Melloul en même temps qu'Anzakan joue le rôle commercial.
                Dans sa trajectoire de développement, Dchira Jihad ne s'est pas distinguée de la trajectoire générale qu'ont connue les villes du pôle urbain de Lakadir, et l'on peut dire qu'elle vit le même processus de transformations sociales, économiques et même culturelles, avec quelques distinctions mineures.
                Développement administratif de la ville
                Le tremblement de terre de 1960 qui a frappé la ville d'Agadir et la Marche Verte de 1975 ont été les deux principaux facteurs du développement de Dchira Jahidiya, conformément à la trajectoire de développement du Pôle Urbain du Grand Agadir.
                Dchira était un petit village témoin de l'installation humaine car il était situé sur la rive droite de la vallée du Souss, au nord-ouest de la plaine du Souss, où l'agriculture était l'activité caractéristique de l'installation humaine. Il a ensuite été rattaché à la communauté rurale d'Ait Melloul, puis élevé au rang de communauté urbaine lors du découpage administratif de 1992.
            </p>
        </div>
    </div>
        
    </div>
    
)

}

export default Acceuil;