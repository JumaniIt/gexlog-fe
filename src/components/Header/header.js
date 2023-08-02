import React from 'react';
import { Link } from '@chakra-ui/react';
import { PiSignInBold } from "react-icons/pi";

const Header = ({ className, img }) => (
  <div className={`header ${className}`}>
    <div className="header--left">
      <img src={img} className={`${className}-logo`} alt="gexlog" />
      <h1 className="logo-name">Gexlog</h1>
    </div>
    <div className="header--right">
      <Link className="header-button button-contact" color='blue.500'>
        Contacto
      </Link>
      <Link className="header-button button-access" color='blue.500'>
        Acceso <PiSignInBold />
      </Link>
    </div>
  </div>
);

export default Header;