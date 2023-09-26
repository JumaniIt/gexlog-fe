import React from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import OrderTable from "../../components/OrderTable";
import Layout from "../../components/Layout";
import { getCurrentUser } from "../../app/utils/sessionUtils";

const Requests = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser(navigate);

  return (
    <Layout headingText={`Hola ${currentUser?.nickname}`} className="orders-layout">
      <div className="container">
        <div className="requests-table">
          <Heading as="h6" size="sm">
            Solicitudes
          </Heading>
        </div>
        <OrderTable />
      </div>
    </Layout>
  );
};

export default Requests;
