import React, { createContext, useState, useContext } from "react";

const OrderContext = createContext();

export const useOrderContext = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orderSearchContext, setOrderSearchContext] = useState([]);

  return (
    <OrderContext.Provider value={{ orderSearchContext, setOrderSearchContext }}>
      {children}
    </OrderContext.Provider>
  );
};
