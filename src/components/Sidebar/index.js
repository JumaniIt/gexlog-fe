import React from "react";
import logoSrc from '../../full-logo.png';
import { Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdListAlt, MdPeople, MdBusiness } from "react-icons/md";

const Sidebar = () => (
  <div className="sidebar">
    <div className="logo-container">
      {/* <img src={logoSrc} className="sidebar-logo" /> */}
    </div>
    <Divider className="sidebar-divider" />
    <div className="sidebar-actions">
      <Link to="/orders">
        <MdListAlt />
        Solicitudes
      </Link>
      <Link to="/users">
        <MdPeople />
        Usuarios
      </Link>
      <Link to="/clients">
        <MdBusiness />
        Clientes
      </Link>
      <Link to="/profile">
        <MdPeople />
        Mis datos
      </Link>
    </div>
  </div>
);

export default Sidebar;