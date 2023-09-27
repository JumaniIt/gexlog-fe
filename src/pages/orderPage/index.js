import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { getCurrentUser } from "../../app/utils/sessionUtils";
import Order from "../order";


const OrderPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  const [alert, setAlert] = useState({});

  const showAlert = (status, code, message) => {
    setAlert({ status, code, message });
  };

  useEffect(() => {
    if (alert.status) {
      const errorTimeout = setTimeout(() => setAlert({}), 5000);
      return () => clearTimeout(errorTimeout);
    }
  }, [alert]);

  return (
    <Layout
      headingText={`Hola ${currentUser?.nickname}`}
      className="orders-layout"
    >
      {alert.status && (
        <Alert status={alert.status} variant='left-accent'>
          <AlertIcon />
          <AlertTitle>{alert.code}</AlertTitle>
          <AlertDescription>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}
      <div className="container">
        <Order showAlert={showAlert} />
      </div>
    </Layout>
  );
};

export default OrderPage;