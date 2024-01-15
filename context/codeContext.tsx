"use client";
import React, { createContext, useState } from "react";

export const CodeContext = createContext(null);

export const CodeContextProvider = ({ children }) => {
  const [code, setCode] = useState<string>("");
  const [isCodeLoading, setIsCodeLoading] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);
  return (
    <CodeContext.Provider
      value={{
        code,
        setCode,
        success,
        setSuccess,
        isCodeLoading,
        setIsCodeLoading,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};
