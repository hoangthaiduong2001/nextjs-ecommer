"use client";

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error context");
  }
  return context;
};

const AppProvider = ({
  children,
  initSessionToken = "",
}: {
  children: React.ReactNode;
  initSessionToken?: string;
}) => {
  const [sessionToken, setSessionToken] = useState(initSessionToken);
  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
