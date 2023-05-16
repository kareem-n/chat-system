import React, { createContext, useState } from "react";

export const StateManagment = createContext();

const StateContextProvider = ({ children }) => {
  const [chatDetect, setChatDetected] = useState(false);
  const [users, setUsers] = useState(null);

  const value = {
    users,
    setUsers,
    chatDetect,
    setChatDetected,
  };

  return (
    <StateManagment.Provider value={value}>{children}</StateManagment.Provider>
  );
};

export default StateContextProvider;
