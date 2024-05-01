"use client";
import React, { createContext, useState, ReactNode } from "react";

interface MessageContextValue {
  message: string[];
  setMessage: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MessageContext = createContext<MessageContextValue | null>(null);

export const MessageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState<string[]>([]);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
