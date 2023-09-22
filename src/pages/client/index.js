import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Heading } from "@chakra-ui/react";
import ClientForm from "../../components/ClientForm";

const ClientPage = () => {
  return (
    <Layout>
      <ClientForm />
    </Layout>
  );
};

export default ClientPage;
