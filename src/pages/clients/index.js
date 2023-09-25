import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Heading } from "@chakra-ui/react";
import ClientTable from "../../components/ClientTable";

const ClientsPage = () => {
  return (
    <Layout className="clients-page" headingText={"Hola admin"}>
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
