import React, { createContext, useState } from 'react';

export const SearchResultContext = createContext();

export const SearchResultProvider = ({ children }) => {
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState([]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const updateResults = (newResults) => {
    setResults(newResults);
  };

  return (
    <SearchResultContext.Provider value={{ filters, results, updateFilters, updateResults }}>
      {children}
    </SearchResultContext.Provider>
  );
};
