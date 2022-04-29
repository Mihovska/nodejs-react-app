import React from 'react';
import logo from '../images/logo.png'

export default function Navbar() {
    return (
        <nav>
            <img src={logo} alt="Logo" className="nav--icon" />
            <h4 className="nav--title">Star Wars fleet challenge</h4>
        </nav>
    )
}