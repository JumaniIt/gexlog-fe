import React from "react";
import { getCurrentUser } from "../../app/services/userService";
import { Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdListAlt, MdPeople } from "react-icons/md";
import { Heading } from "@chakra-ui/react";
import OrderTable from "../../components/OrderTable";
import logoSrc from '../../full-logo.png';
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";

const Requests = () => {
  const currentUser = getCurrentUser();

  return (
    <Layout headingText={`Hola ${currentUser?.nickname} :-)`}>
      <div className="requests-table">
        <Heading as="h6" size="sm">
          Solicitudes
        </Heading>
      </div>
      <OrderTable />
    </Layout>
  );
};

export default Requests;
