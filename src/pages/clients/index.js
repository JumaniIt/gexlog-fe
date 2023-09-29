import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import ClientTable from "../../components/ClientTable";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../app/utils/sessionUtils";
import { TIMEOUT_MS } from "../../app/utils/alertUtils";

const ClientsPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

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
    <Layout
      className="clients-page"
      headingText={`Hola ${currentUser?.nickname}`}
    >
      {alert.status && (
        <Alert status={alert.status} variant="left-accent">
          <AlertIcon />
          <AlertTitle>{alert.code}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <div className="container">
        <div className="clients-table">
          <Heading as="h6" size="sm">
            Clientes
          </Heading>
        </div>
        <ClientTable showAlert={showAlert} />
      </div>
    </Layout>
  );
};

export default ClientsPage;
