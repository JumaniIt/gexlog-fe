import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import ClientForm from "../../components/ClientForm";
import { TIMEOUT_MS } from "../../app/utils/alertUtils";
import LoadingBlur from "../../components/LoadingBlur/loadingBlur";
import { getCurrentUser } from "../../app/utils/sessionUtils";

const ClientPage = () => {
  const [isBlurLoading, setBlurLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const currentUser = getCurrentUser();

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
      className="profile-view"
      headingText={`Hola ${currentUser?.nickname}`}
    >
      {alert.status && (
        <Alert status={alert.status} variant="left-accent">
          <AlertIcon />
          <AlertTitle>{alert.code}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <ClientForm showAlert={showAlert} setBlurLoading={setBlurLoading} />
      <LoadingBlur isLoading={isBlurLoading} />
    </Layout>
  );
};

export default ClientPage;
