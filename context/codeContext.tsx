"use client";
import React, { createContext, useState } from "react";

export const CodeContext = createContext(null);

export const CountContextProvider = ({ children }) => {
  const [code, setCode] = useState<string>("");

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};
