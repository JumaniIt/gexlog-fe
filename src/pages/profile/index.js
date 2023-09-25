import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Heading } from "@chakra-ui/react";
import ProfileView from "../../components/ProfileView";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../app/utils/sessionUtils";

const ProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  return (
    <Layout headingText={`Hola ${currentUser?.nickname} :-)`}>
      <div className="requests-table">
        <Heading as="h6" size="sm">
          Mis datos
        </Heading>
      </div>
      <ProfileView />
    </Layout>
  );
};

export default ProfilePage;
