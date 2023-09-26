import React from "react";
import logoSrc from "../../full-logo.png";
import { Divider } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdListAlt, MdPeople, MdBusiness } from "react-icons/md";
import { getCurrentUser } from "../../app/utils/sessionUtils";

const Sidebar = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  return (
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
        {currentUser?.admin && (
          <Link to="/users">
            <MdPeople />
            Usuarios
          </Link>
        )}

        {currentUser?.admin && (
          <Link to="/clients">
            <MdBusiness />
            Clientes
          </Link>
        )}

        {!currentUser?.admin && (
          <Link to="/profile">
            <MdPeople />
            Perfil
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
