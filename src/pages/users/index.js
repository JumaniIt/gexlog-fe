import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import UserTable from "../../components/UserTable";
import {
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../app/utils/sessionUtils";
import LoadingBlur from "../../components/LoadingBlur/loadingBlur";
import { TIMEOUT_MS } from "../../app/utils/alertUtils";

const UsersPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);
  const [isBlurLoading, setBlurLoading] = useState(true);

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
      className="users-page"
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
        <div className="users-table">
          <Heading as="h6" size="sm">
            Usuarios
          </Heading>
        </div>
        <UserTable showAlert={showAlert} setBlurLoading={setBlurLoading} />
        <LoadingBlur isLoading={isBlurLoading} />
      </div>
    </Layout>
  );
};

export default UsersPage;
