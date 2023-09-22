import React, { useState } from "react";
import Layout from "../../components/Layout";
import UserTable from "../../components/UserTable";
import { Heading } from "@chakra-ui/react";

const UsersPage = () => {
  return (
    <Layout>
      <div className="users-table">
        <Heading as="h6" size="sm">
          Usuarios
        </Heading>
      </div>
      <UserTable />
    </Layout>
  );
};

export default UsersPage;
