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
                <li><a href="/contact">Contact</a></li>
                <li><a href="/login">Admin Login</a></li>
            </ul>
        </nav>  
        </header>
}

export default Header ;