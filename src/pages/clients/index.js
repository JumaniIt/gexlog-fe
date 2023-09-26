import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Heading } from "@chakra-ui/react";
import ClientTable from "../../components/ClientTable";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../app/utils/sessionUtils";

const ClientsPage = () => {

  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  return (
    <Layout className="clients-page" headingText={`Hola ${currentUser?.nickname}`}>
      <div className="container">
        <div className="clients-table">
          <Heading as="h6" size="sm">
            Clientes
          </Heading>
        </div>
        <ClientTable />
      </div>
    </Layout>
  );
};

export default ClientsPage;
