import React from 'react';
import { Divider } from '@chakra-ui/react'

const Footer = ({ className }) => {
  return (
    <footer className={`footer ${className}`}>
      <Divider />
      <div className="footer-content">
        <p>administracion@gexlog.com</p>
        <p>+54 11 3651 7326</p>
      </div>
    </footer>
  )
}

export default Footer;