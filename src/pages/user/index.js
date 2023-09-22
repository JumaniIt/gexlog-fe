import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Heading } from "@chakra-ui/react";
import UserForm from "../../components/UserForm";

const UserPage = () => {
  return (
    <Layout>
      <UserForm />
    </Layout>
  );
};

export default UserPage;