import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import ProfileView from "../../components/ProfileView";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../app/utils/sessionUtils";
import { TIMEOUT_MS } from "../../app/utils/alertUtils";
import LoadingBlur from "../../components/LoadingBlur/loadingBlur";

const ProfilePage = () => {
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
      className="profile-view"
      headingText={`Hola ${currentUser?.nickname}`}
    >
      {alert.status && (
        <Alert status={alert.status}>
          <AlertIcon />
          <AlertTitle>{alert.code}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <div className="container">
        <Heading as="h6" size="sm">
          Perfil
        </Heading>
        <ProfileView showAlert={showAlert} setBlurLoading={setBlurLoading} />
        <LoadingBlur isLoading={isBlurLoading} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
