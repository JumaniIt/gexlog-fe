import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import OrderTable from "../../components/OrderTable";
import Layout from "../../components/Layout";
import { getCurrentUser } from "../../app/utils/sessionUtils";
import { TIMEOUT_MS } from "../../app/utils/alertUtils";

const Requests = () => {
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
      headingText={`Hola ${currentUser?.nickname}`}
      className="orders-layout"
    >
      {alert.status && (
        <Alert status={alert.status}>
          <AlertIcon />
          <AlertTitle>{alert.code}</AlertTitle>
          <AlertDescription>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}
      <div className="container">
        <div className="requests-table">
          <Heading as="h6" size="sm">
            Solicitudes
          </Heading>
        </div>
        <OrderTable showAlert={showAlert} />
      </div>
    </Layout>
  );
};

export default Requests;