import React, { createContext, useState, useContext } from "react";

const ClientContext = createContext();

export const useClientContext = () => {
  return useContext(ClientContext);
};

export const ClientProvider = ({ children }) => {
  const [clientSearchContext, setClientSearchContext] = useState([]);

  return (
    <ClientContext.Provider
      value={{ clientSearchContext, setClientSearchContext }}
    >
      {children}
    </ClientContext.Provider>
  );
};
