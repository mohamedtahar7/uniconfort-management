"use client";
import React, { createContext, useEffect, useState } from "react";
export const QueryContext = createContext<any>("");
const QueryProvider = ({ children }: any) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const emptyQuery = "";
    setQuery(emptyQuery);
  }, []);

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
