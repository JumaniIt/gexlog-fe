import React from 'react';
import { Divider } from '@chakra-ui/react'

const Footer = ({ className }) => {
  return (
    <footer className={`footer ${className}`}>
      <Divider />
      <div className="footer-content">
        <p>2023©</p>
      </div>
    </footer>
  )
}

export default Footer;