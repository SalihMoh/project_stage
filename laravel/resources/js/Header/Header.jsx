import React from "react";
import '../../css/Header/Header.css'
import logo from '../../../img/logo Commune.jpg' ;


function Header () {
    return <header>
        <nav className="headernav">
            <div className="imgB">
            <img src={logo} alt="img" />
            <p>Bonjour à La Commune</p>
            </div>
            
            <ul className="listnav">
                <li><a href="/">Acceuil</a></li>
<<<<<<< HEAD
                <li><a href="/form-EC">Nos Services</a></li>
                <li><a href="">Actualité</a></li>
                <li><a href="/contact">Contact</a></li>
=======
                <li><a href="/contact">Contact</a></li>
                <li><a href="/login">Admin Login</a></li>
>>>>>>> bc3ebec528a48a4473095551c04d0560be99ec6c
            </ul>
        </nav>  
        </header>
}

export default Header ;