import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import UserForm from "../../components/UserForm";
import { TIMEOUT_MS } from "../../app/utils/alertUtils";

const UserPage = () => {
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
        <Alert status={alert.status}>
          <AlertIcon />
          <AlertTitle>{alert.code}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <UserForm showAlert={showAlert}/>
    </Layout>
  );
};

export default UserPage;
