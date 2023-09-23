import React from "react";
import { Divider } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdListAlt, MdPeople } from "react-icons/md";
import { Heading } from "@chakra-ui/react";
import OrderTable from "../../components/OrderTable";
import logoSrc from '../../full-logo.png';
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import { getCurrentUser } from "../../app/utils/sessionUtils";

const Requests = () => {

  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

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
