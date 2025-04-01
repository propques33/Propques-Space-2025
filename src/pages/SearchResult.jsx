import React, { useContext, useEffect, useState } from 'react';
import { SearchResultContext } from '../context/SearchResultContext';

const SearchResult = () => {
  const { filters } = useContext(SearchResultContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Simulate fetching search results from backend based on filters
    const fetchResults = async () => {
      // Build query parameters from filters
      const queryParams = new URLSearchParams(filters).toString();
      // Replace with your actual API endpoint
      const res = await fetch(`http://localhost:3000/api/search?${queryParams}`);
      const data = await res.json();
  
      setResults(data);
    };

    fetchResults();
  }, [filters]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.length ? (
        results.map((result) => (
          <div key={result.id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-semibold">{result.name}</h2>
            <p>{result.description}</p>
            <p>
              <strong>City:</strong> {result.city}
            </p>
            <p>
              <strong>Project:</strong> {result.project}
            </p>
            <p>
              <strong>Area:</strong> {result.area}
            </p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
