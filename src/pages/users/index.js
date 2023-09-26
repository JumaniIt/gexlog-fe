import React, { useState } from "react";
import Layout from "../../components/Layout";
import UserTable from "../../components/UserTable";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../app/utils/sessionUtils";

const UsersPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  return (
    <Layout className="users-page" headingText={`Hola ${currentUser?.nickname}`}>
      <div className="container">
        <div className="users-table">
          <Heading as="h6" size="sm">
            Usuarios
          </Heading>
        </div>
        <UserTable />
      </div>
    </Layout>
  );
};

export default UsersPage;
