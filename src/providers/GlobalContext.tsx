/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext } from "react";

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ value, children }: any) => {
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobal = () => useContext(GlobalContext);
