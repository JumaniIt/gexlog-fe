import React from "react";
import { getCurrentUser } from "../../app/services/userService";
import { Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdListAlt, MdPeople } from "react-icons/md";
import { Heading } from "@chakra-ui/react";
import OrderTable from "../../components/OrderTable";
import UserTable from "../../components/UserTable";
import ClientTable from "../../components/ClientTable";
import logoSrc from '../../full-logo.png';

const Requests = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="requests-container">
      <div className="requests-left-bar">
        <div className="logo-container">
          <img src={logoSrc} className="left-bar-logo" />
        </div>
        <Divider />
        <div className="left-bar-actions">
          <Link to="/orders">
            <MdListAlt />
            Solicitudes
          </Link>
          <Link to="/users">
            <MdPeople />
            Usuarios
          </Link>
        </div>
      </div>
      <div className="requests-main-section">
        <div className="heading-container">
          <Heading as="h4" size="md">
            Hola {currentUser?.nickname} :-)
          </Heading>
        </div>
        <Divider />
        {/* Table */}

        <div className="requests-table">
          <Heading as="h6" size="sm">
            Solicitudes
          </Heading>
        </div>
        <OrderTable />

        {/*<div className="requests-table">
          <Heading as="h6" size="sm">
            Usuarios
          </Heading>
        </div>
<UserTable />*/}

        {/*   <div className="requests-table">
          <Heading as="h6" size="sm">
            Clientes
          </Heading>
        </div>
        <ClientTable /> */}
      </div>
    </div>
  );
};

export default Requests;
