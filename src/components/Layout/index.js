import React from "react";
import { Heading } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

import Sidebar from "../Sidebar";

const Layout = ({  className, headingText, children }) => {
  return (
    <div className={`layout ${className}`}>
      <div className="layout-left">
        <Sidebar />
      </div>
      <div className="layout-right">
        <div className="heading-container">
          <Heading as="h4" size="md">
            {headingText}
          </Heading>
        </div>
        <Divider className="layout-heading-divider" />
        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
