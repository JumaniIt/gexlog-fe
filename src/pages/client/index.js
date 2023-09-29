import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import ClientForm from "../../components/ClientForm";
import { TIMEOUT_MS } from "../../app/utils/alertUtils";

const ClientPage = () => {
  const [alert, setAlert] = useState({});

  const showAlert = (status, code, message) => {
    setAlert({ status, code, message });
  };

  useEffect(() => {
    if (alert.status) {
      const errorTimeout = setTimeout(() => setAlert({}), TIMEOUT_MS);
      return () => clearTimeout(errorTimeout);
    }
  }, [alert]);

  return (
    <Layout>
      {alert.status && (
        <Alert status={alert.status} variant="left-accent">
          <AlertIcon />
          <AlertTitle>{alert.code}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <ClientForm showAlert={showAlert}/>
    </Layout>
  );
};

export default ClientPage;
