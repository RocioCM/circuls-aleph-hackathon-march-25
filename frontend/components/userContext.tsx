"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  walletAddress: string | null;
  username: string | null;
  setWalletAddress: (walletAddress: string | null) => void;
  setUserName: (name: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [username, setUserName] = useState<string | null>(null);
  return (
    <UserContext.Provider
      value={{ walletAddress, username, setWalletAddress, setUserName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
