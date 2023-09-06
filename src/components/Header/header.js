import React from 'react';
// import { Link } from '@chakra-ui/react';

import { Link } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";

const Header = ({ className, img, onLoginClick }) => (
  <div className={`header ${className}`}>
    <div className="header--left">
      <img src={img} className={`${className}-logo`} alt="gexlog" />
      <h1 className="logo-name">Gexlog</h1>
    </div>
    <div className="header--right">
      <Link to="/login" className="header-button button-access" color='blue.500' onClick={onLoginClick}>
        Acceso <PiSignInBold />
      </Link>
    </div>
  </div>
);

export default Header;