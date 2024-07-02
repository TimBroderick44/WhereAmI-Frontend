import React, { createContext, useContext, useState } from 'react';
import { suburbPostcodeService } from '../services/suburbPostcodeService';
import { SearchContextType, SearchProviderProps } from '../types/searchContext/SearchContext';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"suburb" | "postcode">("suburb");
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (term: string, type: "suburb" | "postcode") => {
    setSearchTerm(term);
    setSearchType(type);
  
    const result = await suburbPostcodeService.fetchResults(term, type);
    if (result) {
      setResults(result.suburb.map((suburb: string) => ({
        suburb,
        postcodes: result.postcode
      })));
      setSearchSuccess(true);
    } 
  };

  const updateResults = (newResult: any) => {
    setResults((prevResults) => [...prevResults, newResult]);
  };
  
  const resetSearch = () => {
    setSearchTerm("");
    setSearchType("suburb");
    setResults([]);
    setSearchSuccess(false);
  };

  return (
    <SearchContext.Provider value={{ searchTerm, searchType, searchSuccess, results, handleSearch, updateResults, setSearchTerm, setSearchSuccess, resetSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
