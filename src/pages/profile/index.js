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
    <Layout className="profile-view" headingText={`Hola ${currentUser?.nickname} :-)`}>
      <div className="container">
        <Heading as="h6" size="md">
          Mis datos
        </Heading>
        <ProfileView />
      </div>
    </Layout>
  );
};

export default ProfilePage;
