import React from "react";
import { Spinner } from "@chakra-ui/react";

const LoadingBlur = ({ isLoading }) => {
  return (
    <div>
      {isLoading && (
        <div className="loading-blur">
          <div className="loading-content">
            <Spinner size="xl" color="blue.500"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingBlur;