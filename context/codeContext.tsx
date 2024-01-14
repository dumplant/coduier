"use client";
import React, { createContext, useState } from "react";

export const CodeContext = createContext(null);

export const CodeContextProvider = ({ children }) => {
  const [code, setCode] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  return (
    <CodeContext.Provider value={{ code, setCode, success, setSuccess }}>
      {children}
    </CodeContext.Provider>
  );
};
