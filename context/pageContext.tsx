"use client";
import React, { createContext, useState } from "react";

export const PageContext = createContext(null);

export const PageContextProvider = ({ children }) => {
  const [pageName, setPageName] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");

  return (
    <PageContext.Provider
      value={{ pageName, setPageName, projectName, setProjectName }}
    >
      {children}
    </PageContext.Provider>
  );
};
