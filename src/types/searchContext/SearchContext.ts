import { ReactNode } from "react";

export interface SearchContextType {
  searchTerm: string;
  searchType: 'suburb' | 'postcode';
  searchSuccess: boolean;
  results: any[];
  handleSearch: (term: string, type: 'suburb' | 'postcode') => Promise<void>;
  updateResults: (newResult: any) => void; 
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSearchSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  resetSearch: () => void; 
}

export interface SearchProviderProps {
  children: ReactNode;
}