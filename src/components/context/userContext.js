import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userSearchContext, setUserSearchContext] = useState([]);

  return (
    <UserContext.Provider value={{ userSearchContext, setUserSearchContext }}>
      {children}
    </UserContext.Provider> 
  );
};
