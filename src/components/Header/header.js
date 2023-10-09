import React from 'react';
// import { Link } from '@chakra-ui/react';

import { Link } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { Button } from '@chakra-ui/react';

const Header = ({ className, img, onLoginClick }) => (
  <div className={`header ${className}`}>
    <div className="header--left">
      <img src={img} className={`${className}-logo`} alt="gexlog" />
      <h1 className="logo-name">Gexlog</h1>
    </div>
    <div className="header--right">
      <Button className="header-button button-access" color='blue.500' onClick={onLoginClick} variant={"transparent"}>
        Acceso <PiSignInBold />
      </Button>
    </div>
  </div>
);

export default Header;