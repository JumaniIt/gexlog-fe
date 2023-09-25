import React, { useState } from "react";
import Layout from "../../components/Layout";
import UserTable from "../../components/UserTable";
import { Heading } from "@chakra-ui/react";

const UsersPage = () => {
  return (
    <Layout className="users-page" headingText={"holis"}>
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
