"use client";
import React, { createContext, useState, useContext } from 'react';

// Create a context
const EmployeeContext = createContext();

// Create a provider component
const EmployeeProvider = ({ children }) => {
  const [user,setUser] = useState({});

  return (
    <EmployeeContext.Provider value={{ user, setUser }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to use the context
const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};

export { EmployeeProvider, useEmployeeContext };
